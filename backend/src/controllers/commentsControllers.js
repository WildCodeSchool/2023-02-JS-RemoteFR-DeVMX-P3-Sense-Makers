const models = require("../models");

const browseComments = (req, res) => {
  const decisionId = parseInt(req.params.id, 10);

  models.comment
    .findAllCommentsForOneDecision(decisionId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readComment = (req, res) => {
  models.comment
    .find(req.params.commentid)
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

const editComment = (req, res) => {
  const comment = req.body;

  // TODO validations (length, format...)

  comment.id = parseInt(req.params.commentid, 10);

  models.comment
    .update(comment)
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

const addComment = (req, res) => {
  const decisionId = parseInt(req.params.id, 10);
  const comment = req.body;
  comment.user_id = req.body.userId;

  // TODO validations (length, format...)

  models.comment
    .insert(comment, decisionId)
    .then(([result]) => {
      res.location(`/comments/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyComment = (req, res) => {
  models.comment
    .delete(req.params.commentid)
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
  browseComments,
  readComment,
  editComment,
  addComment,
  destroyComment,
};
