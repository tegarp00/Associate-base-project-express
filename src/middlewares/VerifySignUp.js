const db = require('../models');

const { User, ROLES } = db;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body;
  let user = await User.findOne({ where: { username } });
  if (user) {
    res.status(400).send({
      message: 'Failed! Username already in used!',
    });
    user = await user.findOne({ where: { email } });
    if (user) {
      res.status(400).send({
        message: 'Failed! Email already in used!',
      });
    } else next();
  } else next();
};

const checkRolesExisted = (req, res, next) => {
  const { roles } = req.body;
  if (roles) {
    // eslint-disable-next-line no-restricted-syntax
    for (const role of roles) {
      if (!ROLES.includes(role)) {
        res.status(400).send({
          message: `Failed! Role does not exist = ${role}`,
        });
        return;
      }
    }
  }

  next();
};

const VerifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = VerifySignUp;
