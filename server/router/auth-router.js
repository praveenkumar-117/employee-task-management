const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller")
const authmiddleware = require("../middleware/auth-middleware")
const { signupSchema, loginSchema } = require("../validator/auth-validator")
const validation = require("../middleware/validate-middleware")





router.route("/").get(authController.home)
router.post("/signup", validation(signupSchema), authController.signup); 
router.post("/login", validation(loginSchema), authController.login);
router.route("/user").get(authmiddleware,authController.user);

module.exports = router;