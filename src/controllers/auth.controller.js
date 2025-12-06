const { userSchema } = require("../models");
const AuthService = require("../services/auth.service");

class AuthController {
  static async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          status: false,
          message: "Name, email and password are required",
        });
      }

      const userExist = await userSchema.findOne({ email });
      if (userExist) {
        return res.status(400).json({
            status: false,
            message: "Email already in use",
            data: {},
        });
      }

      const user = await AuthService.registerUser({ name, email, password });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "User registration failed",
          data: {},
        });
      }

      return res.status(201).json({
        status: true,
        message: "User registered successfully",
        data: { user },
      });
    } catch (error) {
      console.error("SomeThing went wrong in  User Registration");
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: "Email and password are required",
          data: {},
        });
      }

      const { user, accessToken, refreshToken } = await AuthService.loginUser({email,password});
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "Login failed",
                data: {},
            });
        }
        
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

        return res.status(200).json({
            status: true,
            message: "User logged in successfully",
            data: { user, accessToken },
        });

    } catch (error) {
      console.error("SomeThing went wrong in User Login");
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        data: {},
      });
    }
  }
}

module.exports = AuthController;
