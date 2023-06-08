const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const commentsControllers = require("./controllers/commentsControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/comments", commentsControllers.browse);
router.get("/comments/:id", commentsControllers.read);
router.put("/comments/:id", commentsControllers.edit);
router.post("/comments", commentsControllers.add);
router.delete("/comments/:id", commentsControllers.destroy);

module.exports = router;
