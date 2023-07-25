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

// decisions routes
router.get("/decisions", decisionControllers.browseDecisions);
router.get("/decisions/:id", decisionControllers.readDecision);
router.get("/decisions/:id/comments", commentsControllers.browseComments);
router.get("/decisions/:id/expert", decisionControllers.readExpertOnDecision);
router.get(
  "/decisions/:id/impacted",
  decisionControllers.readImpactedOnDecision
);
router.get(
  "/decisions/:id/comments/:commentid",
  commentsControllers.readComment
);

router.post("/decisions", decisionControllers.addDecision);
router.post("/decisions/:id/impacted", decisionControllers.addImpacted);
router.post("/decisions/:id/expert", decisionControllers.addExpert);
router.post("/decisions/:id/user", decisionControllers.addUserOnDecision);
router.post("/decisions/:id/comments", commentsControllers.addComment);

router.put("/decisions/:id", decisionControllers.editDecision);
router.put("/decisions/:id/validation", decisionControllers.editvalidation);
router.put(
  "/decisions/:id/comments/:commentid",
  commentsControllers.editComment
);

router.delete("/decisions/:id", decisionControllers.destroyDecision);
router.delete(
  "/decisions/:id/comments/:commentid",
  commentsControllers.destroyComment
);

// users routes
router.get("/users", usersControllers.browseUsersWithRoles);
router.get("/users/concat", usersControllers.BrowseConcatUsers);
router.get("/users/experts", usersControllers.BrowseConcatExperts);
router.get("/users/:id", usersControllers.readUserWithRoles);
router.get("/users/:id/decisions", usersControllers.browseAllDecisionsByUser);
router.get("/users/:id/taggedexperts", usersControllers.getExpertUsersForNotif);
router.get(
  "/users/:id/taggedimpacted",
  usersControllers.getImpactedUsersForNotif
);
router.get(
  "/users/:id/validationexpert",
  usersControllers.getExpertForValidationNotif
);

router.post("/users", hashPassword, usersControllers.addUser);
router.post("/users/:id/role", usersControllers.addRoleToUser);

router.put("/users/:id", usersControllers.editUser);
router.put("/users/:id/role", usersControllers.editUserRole);
router.put("/users/:id/roleexpert", usersControllers.editUserRole);
router.put("/users/:id/isactive", usersControllers.editUserIsActive);
router.put("/users/:id/myprofil", usersControllers.editUserMyProfil);
router.put("/users/:id/taggedimpacted", usersControllers.modifyImpactNotifRead);
router.put("/users/:id/taggedexperts", usersControllers.modifyExpertNotifRead);

router.delete("/users/:id", usersControllers.destroyUser);
router.delete("/users/:id/roleexpert", usersControllers.destroyUserRoleExpert);

// Roles routes
router.get("/roles", rolesControllers.browseRoles);
router.get("/roles/:id", rolesControllers.readRole);

router.post("/roles", rolesControllers.addRole);

router.put("/roles/:id", rolesControllers.editRole);

router.delete("/roles/:id", rolesControllers.destroyRole);

// status routes
router.get("/status", statusControllers.browseStatus);

// concernedHub routes
router.get("/concernedhub", decisionControllers.concernedHub);

// uploads routes
router.post("/uploads", upload.single("photo"), uploadFile.postFile);

// sendmail routes
router.post("/sendmail", mailControllers.sendMailById);

module.exports = router;
