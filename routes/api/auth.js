const express = require("express");

const router = express.Router();
const controllers = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validateBodyNewUser, authentication, validateUpdateUser, upload } = require("../../middlewares");

router.post("/register", validateBodyNewUser(schemas.schemaJoiRegister), controllers.register);

router.post("/login", validateBodyNewUser(schemas.schemaJoiLogin), controllers.login);

router.get("/current", authentication, controllers.getCurrent);

router.post("/logout", authentication, controllers.logout);

router.patch("/", authentication, validateUpdateUser(schemas.schemaJoiUpdate), controllers.updateSubscription)

router.patch("/avatars", authentication, upload.single("avatar"), controllers.updateAvatar);

module.exports = router;
