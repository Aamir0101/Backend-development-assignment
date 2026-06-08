const express = require("express");
const userController = require("../controller/authController")
const router= express.Router();

router.route("/signup")
.get(userController.renderSignupForm)
.post(userController.register);


router.route("/login")
.get(userController.renderLoginForm)
.post(userController.login);

module.exports = router;