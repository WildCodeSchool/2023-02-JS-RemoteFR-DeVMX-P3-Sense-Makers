const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "./public/uploads/" });

const uploadFile = require("./services/uploadFile");
const commentsControllers = require("./controllers/commentsControllers");
const decisionControllers = require("./controllers/decisionControllers");
const statusControllers = require("./controllers/statusControllers");
const usersControllers = require("./controllers/usersControllers");
const mailControllers = require("./controllers/mailControllers");
const rolesControllers = require("./controllers/rolesControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/checkAuth");

// public route
router.post("/login", usersControllers.getUserByEmail, verifyPassword);

router.post(
  "/forgotpassword",
  usersControllers.getUserByEmail,
  mailControllers.sendMailResetById
);
router.put("/resetpassword", hashPassword, usersControllers.editUserPassword);
// routes protected
router.use(verifyToken);

router.get("/decisions", decisionControllers.browseDecisions);
router.get("/decisions/:id", decisionControllers.readDecision);
router.get(
  "/decisions/:id/impacted",
  decisionControllers.readImpactedOnDecision
);
router.post("/decisions/:id/impacted", decisionControllers.addImpacted);
router.get("/decisions/:id/expert", decisionControllers.readExpertOnDecision);
router.post("/decisions/:id/expert", decisionControllers.addExpert);
router.post("/decisions/:id/user", decisionControllers.addUserOnDecision);

router.put("/decisions/:id", decisionControllers.editDecision);
router.put("/decisions/:id/validation", decisionControllers.editvalidation);
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

router.get("/users", usersControllers.browseUsersWithRoles);
router.get("/users/concat", usersControllers.BrowseConcatUsers);
router.get("/users/experts", usersControllers.BrowseConcatExperts);

router.get("/users/:id", usersControllers.readUserWithRoles);
router.get("/users/:id/decisions", usersControllers.browseAllDecisionsByUser);
router.post("/users", hashPassword, usersControllers.addUser);
router.post("/users/:id/role", usersControllers.addRoleToUser);
router.put("/users/:id/role", usersControllers.editUserRole);
router.put("/users/:id/roleexpert", usersControllers.editUserRole);
router.put("/users/:id", usersControllers.editUser);
router.put("/users/:id/isactive", usersControllers.editUserIsActive);
router.put("/users/:id/myprofil", usersControllers.editUserMyProfil);
router.delete("/users/:id", usersControllers.destroyUser);
router.delete("/users/:id/roleexpert", usersControllers.destroyUserRoleExpert);

router.post("/uploads", upload.single("photo"), uploadFile.postFile);

router.get("/concernedhub", decisionControllers.concernedHub);

router.post("/sendmail", mailControllers.sendMailById);

router.get("/roles", rolesControllers.browseRoles);
router.get("/roles/:id", rolesControllers.readRole);
router.post("/roles", rolesControllers.addRole);
router.put("/roles/:id", rolesControllers.editRole);
router.delete("/roles/:id", rolesControllers.destroyRole);

router.get(
  "/users/:id/taggedimpacted",
  usersControllers.getImpactedUsersForNotif
);
router.get("/users/:id/taggedexperts", usersControllers.getExpertUsersForNotif);

router.put("/users/:id/taggedimpacted", usersControllers.modifyImpactNotifRead);
router.put("/users/:id/taggedexperts", usersControllers.modifyExpertNotifRead);
module.exports = router;
