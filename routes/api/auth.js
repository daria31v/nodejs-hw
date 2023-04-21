const express = require("express");

const router = express.Router();
const controllers = require("../../controllers/auth");

const { schemas } = require("../../models/user");
const { validateBodyNewUser } = require("../../middlewares");


router.post("/register", validateBodyNewUser(schemas.schemaJoiRegister), controllers.register);

router.post("/login", validateBodyNewUser(schemas.schemaJoiLogin), controllers.login);

module.exports = router;
