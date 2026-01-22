const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await authService.register({ name, email, password, role });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { token } = req.body;
    const result = await authService.refresh(token);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { token } = req.body;
    await authService.logout(req.user._id, token);
    res.json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refresh, logout };


