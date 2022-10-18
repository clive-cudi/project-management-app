const router = require('express').Router();
const authVerify = require("../middleware/auth_verify");
const AuthController = require('../controllers/auth.controller');

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

router.post("/verify", authVerify, AuthController.verify);

module.exports = router;