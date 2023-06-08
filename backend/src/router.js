const express = require("express");

const router = express.Router();

const commentsControllers = require("./controllers/commentsControllers");
const decisionControllers = require("./controllers/decisionControllers");

router.get("/decisions", decisionControllers.browse);
router.get("/decisions/:id", decisionControllers.read);
router.put("/decisions/:id", decisionControllers.edit);
router.post("/decisions", decisionControllers.add);
router.delete("/decisions/:id", decisionControllers.destroy);

router.get("/comments", commentsControllers.browse);
router.get("/comments/:id", commentsControllers.read);
router.put("/comments/:id", commentsControllers.edit);
router.post("/comments", commentsControllers.add);
router.delete("/comments/:id", commentsControllers.destroy);

module.exports = router;
