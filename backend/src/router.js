const express = require("express");

const router = express.Router();

const commentsControllers = require("./controllers/commentsControllers");
const decisionControllers = require("./controllers/decisionControllers");
const statusControllers = require("./controllers/statusControllers");

router.get("/decisions", decisionControllers.browseDecisions);
router.get("/decisions/:id", decisionControllers.readDecision);
router.get(
  "/decisions/:id/impacted",
  decisionControllers.readImpactedOnDecision
);
router.get("/decisions/:id/expert", decisionControllers.readExpertOnDecision);
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

module.exports = router;
