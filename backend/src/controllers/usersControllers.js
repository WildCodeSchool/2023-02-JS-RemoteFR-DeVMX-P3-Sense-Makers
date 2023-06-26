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

const addUser = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

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

module.exports = {
  browseUsers,
  browseAllDecisionsByUser,
  readUser,
  editUser,
  addUser,
  addRoleToUser,
  destroyUser,
  BrowseConcatUsers,
  BrowseConcatExperts,
};
