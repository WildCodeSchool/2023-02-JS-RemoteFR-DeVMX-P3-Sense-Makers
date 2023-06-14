const models = require("../models");

const browseStatus = (req, res) => {
  models.status
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readStatus = (req, res) => {
  models.status
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

const editStatus = (req, res) => {
  const status = req.body;

  // TODO validations (length, format...)

  status.id = parseInt(req.params.id, 10);

  models.status
    .update(status)
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

const addStatus = (req, res) => {
  const status = req.body;

  // TODO validations (length, format...)

  models.status
    .insert(status)
    .then(([result]) => {
      res.location(`/status/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyStatus = (req, res) => {
  models.status
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
  browseStatus,
  readStatus,
  editStatus,
  addStatus,
  destroyStatus,
};
