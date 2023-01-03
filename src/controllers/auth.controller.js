const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const { secret } = require('../config/auth.config');

const { User, Role } = db;
const { Op } = db.Sequelize;

exports.signup = async (req, res) => {
  const {
    username, email, password, roles,
  } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    if (roles) {
      const userRoles = await Role.findAll({
        where: {
          name: {
            [Op.or]: roles,
          },
        },
      });
      await user.setRoles(userRoles);
      res.respond({ message: 'User was registered successfully!' });
    } else {
      await user.setRoles([1]);
      res.respond({ message: 'User was registered successfully!' });
    }
  } catch (error) {
    res.respond({ message: error.message }, 500);
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      res.respond({ message: 'User Not found.' }, 404);
    } else {
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        res.respond({
          message: 'Wrong Credentials!',
        }, 401);
      }

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400,
      });
      const authorities = [];
      const userRoles = await user.getRoles();
      // eslint-disable-next-line no-restricted-syntax
      for (const role of userRoles) {
        authorities.push(`ROLE_${role.name.toUpperCase()}`);
      }

      res.respond({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      }, 200);
    }
  } catch (error) {
    res.respond({ message: error.message }, 500);
  }
};
