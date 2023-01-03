const jwt = require('jsonwebtoken');
const db = require('../models');

const { secret } = require('../config/auth.config');

const { User } = db;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.respond({
      message: 'No token provided!',
    }, 403);
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.respond({
        message: 'Unauthorized!',
      }, 401);
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  // eslint-disable-next-line no-restricted-syntax
  for (const role of roles) {
    if (role.name === 'admin') {
      next();
      return;
    }
  }
  res.respond({
    message: 'Require Admin Role!',
  }, 403);
};

const isModerator = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  // eslint-disable-next-line no-restricted-syntax
  for (const role of roles) {
    if (role.name === 'moderator') {
      next();
      return;
    }
  }

  res.respond({
    message: 'Require Moderator Role!',
  }, 403);
};

const isModeratorOrAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  // eslint-disable-next-line no-restricted-syntax
  for (const role of roles) {
    if (role.name === 'moderator') {
      next();
      return;
    }

    if (role.name === 'admin') {
      next();
      return;
    }
  }

  res.respond({
    message: 'Require Moderator or Admin Role!',
  }, 403);
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};

module.exports = authJwt;
