const models = require("../models");

const browseRoles = (req, res) => {
  models.roles
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readRole = (req, res) => {
  models.roles
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

const editRole = (req, res) => {
  const role = req.body;

  // TODO validations (length, format...)

  role.id = parseInt(req.params.id, 10);

  models.roles
    .update(role)
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

const addRole = (req, res) => {
  const role = req.body;

  // TODO validations (length, format...)

  models.roles
    .insert(role)
    .then(([result]) => {
      console.info(result);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyRole = (req, res) => {
  models.roles
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
  browseRoles,
  readRole,
  editRole,
  addRole,
  destroyRole,
};
