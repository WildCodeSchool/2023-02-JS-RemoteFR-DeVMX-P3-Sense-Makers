const express = require("express");

const router = express.Router();

const commentsControllers = require("./controllers/commentsControllers");
const decisionControllers = require("./controllers/decisionControllers");

router.get("/decisions", decisionControllers.browse);
router.get("/decisions/:id", decisionControllers.read);
router.put("/decisions/:id", decisionControllers.edit);
router.post("/decisions", decisionControllers.add);
router.delete("/decisions/:id", decisionControllers.destroy);

router.get("/decisions/:id/comments", commentsControllers.browse);
router.get("/decisions/:id/comments/:commentid", commentsControllers.read);
router.put("/decisions/:id/comments/:commentid", commentsControllers.edit);
router.post("/decisions/:id/comments", commentsControllers.add);
router.delete(
  "/decisions/:id/comments/:commentid",
  commentsControllers.destroy
);

module.exports = router;
