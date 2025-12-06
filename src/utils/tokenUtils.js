// Create and verify tokens, and a helper to hash refresh tokens for storage.

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m' });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '30d' });
};

const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_ACCESS_SECRET);
const verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);

const hashToken = async (token) => {
  // use bcrypt so token comparisons are secure and one-way
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(token, salt);
};

const compareTokenHash = async (token, hash) => {
  return bcrypt.compare(token, hash);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
  compareTokenHash,
};


