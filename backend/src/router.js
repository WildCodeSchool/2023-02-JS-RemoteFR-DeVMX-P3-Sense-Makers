const express = require("express");

const router = express.Router();

const commentsControllers = require("./controllers/commentsControllers");
const decisionControllers = require("./controllers/decisionControllers");
const statusControllers = require("./controllers/statusControllers");
const usersControllers = require("./controllers/usersControllers");

router.get("/decisions", decisionControllers.browseDecisions);
router.get("/decisions/:id", decisionControllers.readDecision);
router.get(
  "/decisions/:id/impacted",
  decisionControllers.readImpactedOnDecision
);
router.post("/decisions/:id/impacted", decisionControllers.addImpacted);
router.get("/decisions/:id/expert", decisionControllers.readExpertOnDecision);
router.post("/decisions/:id/expert", decisionControllers.addExpert);

router.put("/decisions/:id", decisionControllers.editDecision);
router.post("/decisions", decisionControllers.addDecision);
router.delete("/decisions/:id", decisionControllers.destroyDecision);

router.get("/decisions/:id/comments", commentsControllers.browseComments);
router.get(
  "/decisions/:id/comments/:commentid",
  commentsControllers.readComment
);
router.put(
  "/decisions/:id/comments/:commentid",
  commentsControllers.editComment
);
router.post("/decisions/:id/comments", commentsControllers.addComment);
router.delete(
  "/decisions/:id/comments/:commentid",
  commentsControllers.destroyComment
);

router.get("/status", statusControllers.browseStatus);

router.get("/users", usersControllers.browseUsers);
router.get("/users/:id", usersControllers.readUser);
router.post("/users", usersControllers.addUser);
router.put("/users/:id", usersControllers.editUser);
router.delete("/users/:id", usersControllers.destroyUser);

module.exports = router;
