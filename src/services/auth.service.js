const refreshTokenModel = require("../models/refreshToken.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const {
  createAccessToken,
  createRefreshToken,
  hashToken,
} = require("../utils/tokenUtils");

class AuthService {
  static async registerUser({ name, email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const safeUser = user.toObject();
      delete safeUser.password;
      return safeUser;
    } catch (error) {
      throw error;
    }
  }

  static async loginUser({ email, password }) {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Invalid credentials");

      const accessToken = createAccessToken({ 
        id: user._id,
        name: user.name
      });
      const refreshToken = createRefreshToken({ id: user._id });

      await refreshTokenModel.deleteMany({ user: user._id });
      // store hashed refresh token
      const refreshHash = await hashToken(refreshToken);
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      await refreshTokenModel.create({
        user: user._id,
        tokenHash: refreshHash,
        expiresAt,
      });

      const safeUser = user.toObject();
      delete safeUser.password;

      return { user: safeUser, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
