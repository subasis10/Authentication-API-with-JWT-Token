const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // firstName
  User.findOne({
    where: {
      firstName: req.body.firstName,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! firstName is already in use!",
      });
      return;
    }

    // lastName
    User.findOne({
      where: {
        lastName: req.body.lastName,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! lastName is already in use!",
        });
        return;
      }

      // Email
      User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!",
          });
          return;
        }

        //phoneNumber
        User.findOne({
          where: {
            phoneNumber: req.body.phoneNumber,
          },
        }).then((user) => {
          if (user) {
            res.status(400).send({
              message: "Failed! phoneNumber is already in use!",
            });
            return;
          }

          next();
        });
      });
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
