const express = require("express");

const router = express.Router();
const controllers = require("../../controllers/auth");

// const { schemas } = require("../../models/user");
// const { validBodyNewUser } = require("../../middlewares");

// singup
router.post("/register", controllers.register);


module.exports = router;
