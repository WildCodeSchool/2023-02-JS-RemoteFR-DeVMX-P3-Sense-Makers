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

module.exports = {
  browseStatus,
};
