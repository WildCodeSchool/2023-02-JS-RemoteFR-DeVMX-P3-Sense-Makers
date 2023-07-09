const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_MAIL;
const models = require("../models");

const browseUsers = (req, res) => {
  models.users
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const browseUsersWithRoles = (req, res) => {
  models.users
    .findAllUsersWithRoles()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const BrowseConcatUsers = (req, res) => {
  models.users
    .findUsersNameConcat()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const BrowseConcatExperts = (req, res) => {
  models.users
    .findUsersNameExpertConcat()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const browseAllDecisionsByUser = (req, res) => {
  models.users
    .findAllDecisionsByUserId(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readUser = (req, res) => {
  models.users
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const readUserWithRoles = (req, res) => {
  models.users
    .findUserWithRolesById(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editUser = (req, res) => {
  const users = req.body;

  // TODO validations (length, format...)

  users.id = parseInt(req.params.id, 10);

  models.users
    .update(users)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const editUserIsActive = (req, res) => {
  const { isActive } = req.body;

  // TODO validations (length, format...)

  const userId = parseInt(req.params.id, 10);

  models.users
    .updateUserIsActive(userId, isActive)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editUserRole = (req, res) => {
  const userId = parseInt(req.params.id, 10);

  const roleId = req.body.role;

  // TODO validations (length, format...)

  models.users
    .updateUserRole(userId, roleId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editUserPassword = (req, res) => {
  const { user } = req.body;
  console.info(req.body);
  // TODO validations (length, format...)
  jwt.verify(user.token, secret, { expiresIn: "1h" }, (err) => {
    if (err) {
      console.info(err.message);
    } else
      models.users
        .updateUserPassword(user)
        .then(([result]) => {
          if (result.affectedRows === 0) {
            res.sendStatus(404);
          } else {
            res.sendStatus(204);
          }
        })
        .catch((error) => {
          console.error(error);
          res.sendStatus(500);
        });
  });
};

const addUser = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)
  console.info(user);
  models.users
    .insert(user)
    .then(([result]) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addRoleToUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);

  const { roleId } = req.body;

  // TODO validations (length, format...)

  models.users
    .insertRoleIntoUser(userId, roleId)
    .then(([result]) => {
      res.status(201).json([result]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyUser = (req, res) => {
  models.users
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyUserRoleExpert = (req, res) => {
  const userId = parseInt(req.params.id, 10);

  models.users
    .deleteUserRoleExpert(userId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByEmail = (req, res, next) => {
  const { email } = req.body;

  models.users
    .selectByEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        [req.user] = users;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  browseUsers,
  browseUsersWithRoles,
  browseAllDecisionsByUser,
  readUser,
  readUserWithRoles,
  editUser,
  editUserIsActive,
  editUserRole,
  addUser,
  addRoleToUser,
  destroyUser,
  BrowseConcatUsers,
  BrowseConcatExperts,
  editUserPassword,
  destroyUserRoleExpert,
  getUserByEmail,
};
