const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "./public/uploads/" });

const uploadFile = require("./services/uploadFile");
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
router.get("/users/concat", usersControllers.BrowseConcatUsers);
router.get("/users/experts", usersControllers.BrowseConcatExperts);

router.get("/users/:id", usersControllers.readUser);
router.get("/users/:id/decisions", usersControllers.browseAllDecisionsByUser);
router.post("/users", usersControllers.addUser);
router.post("/users/:id/role", usersControllers.addRoleToUser);
router.put("/users/:id", usersControllers.editUser);
router.delete("/users/:id", usersControllers.destroyUser);

router.post("/uploads", upload.single("photo"), uploadFile.postFile);

router.get("/concernedhub", decisionControllers.concernedHub);

module.exports = router;
