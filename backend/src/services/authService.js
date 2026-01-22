const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');

const SALT_ROUNDS = 10;

const register = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already exists');
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ name, email, passwordHash, role });
  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshTokens.push({ token: refreshToken });
  await user.save();
  return { user, accessToken, refreshToken };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error('Invalid credentials');
  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshTokens.push({ token: refreshToken });
  await user.save();
  return { user, accessToken, refreshToken };
};

const refresh = async (token) => {
  const user = await User.findOne({ 'refreshTokens.token': token });
  if (!user) throw new Error('Invalid refresh token');
  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshTokens.push({ token: refreshToken });
  await user.save();
  return { accessToken, refreshToken };
};

const logout = async (userId, token) => {
  await User.findByIdAndUpdate(userId, { $pull: { refreshTokens: { token } } });
  return true;
};

module.exports = { register, login, refresh, logout };


