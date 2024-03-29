const models = require("../models");

const browseDecisions = (req, res) => {
  models.decision
    .findAllDecisionsWithStatusAndNameOfCreatorForCard()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readDecision = (req, res) => {
  models.decision
    .findDecisionWithStatusById(req.params.id)
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

const readImpactedOnDecision = (req, res) => {
  models.decision
    .findImpactedOnDecisionById(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
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

const readExpertOnDecision = (req, res) => {
  models.decision
    .findExpertOnDecisionById(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
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

const editDecision = (req, res) => {
  const decision = req.body;

  decision.id = parseInt(req.params.id, 10);

  models.decision
    .update(decision)
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

const editvalidation = (req, res) => {
  const decision = req.body;

  decision.id = parseInt(req.params.id, 10);

  models.decision
    .updateValidation(decision)
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

const addDecision = (req, res) => {
  const decision = req.body;

  // TODO validations (length, format...)

  models.decision
    .insert(decision)
    .then(([result]) => {
      res.status(201).json([result]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addImpacted = (req, res) => {
  const { decisionId, impactedId } = req.body;
  models.decision
    .insertImpactedOnDecisionById(impactedId, decisionId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addExpert = (req, res) => {
  const { decisionId, expertId } = req.body;
  models.decision
    .insertExpertOnDecisionById(expertId, decisionId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addUserOnDecision = (req, res) => {
  const { userId, decisionId } = req.body;
  models.decision
    .insertUserOnDecisionById(userId, decisionId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyDecision = (req, res) => {
  models.decision
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

const concernedHub = (req, res) => {
  models.decision
    .findConcernedHub()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browseDecisions,
  readDecision,
  editDecision,
  addDecision,
  destroyDecision,
  readImpactedOnDecision,
  readExpertOnDecision,
  addImpacted,
  addExpert,
  concernedHub,
  addUserOnDecision,
  editvalidation,
};
