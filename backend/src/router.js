const express = require("express");

const router = express.Router();

const decisionControllers = require("./controllers/decisionControllers");

router.get("/decisions", decisionControllers.browse);
router.get("/decisions/:id", decisionControllers.read);
router.put("/decisions/:id", decisionControllers.edit);
router.post("/decisions", decisionControllers.add);
router.delete("/decisions/:id", decisionControllers.destroy);

module.exports = router;
