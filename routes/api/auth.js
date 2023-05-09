const express = require("express");

const router = express.Router();
const controllers = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validateBodyNewUser, authentication, validateUpdateUser, upload, validateVerifyEmail } = require("../../middlewares");

router.post("/register", validateBodyNewUser(schemas.schemaJoiRegister), controllers.register);

router.get("/verify/:verificationToken", controllers.verifyEmailUser);

router.post("/verify", validateVerifyEmail(schemas.schemaJoiEmail), controllers.resentVerifyEmail);

router.post("/login", validateBodyNewUser(schemas.schemaJoiLogin), controllers.login);

router.get("/current", authentication, controllers.getCurrent);

router.post("/logout", authentication, controllers.logout);

router.patch("/", authentication, validateUpdateUser(schemas.schemaJoiUpdate), controllers.updateSubscription)

router.patch("/avatars", authentication, upload.single("avatar"), controllers.updateAvatar);

router.get("/verify/:verificationToken", authentication);

module.exports = router;
