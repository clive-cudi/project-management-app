const router = require('express').Router();
const authVerify = require("../middleware/auth_verify");
const AuthController = require('../controllers/auth.controller');

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

router.post("/verify", authVerify, AuthController.verify);

router.post("/enabletwofactorstep1", authVerify, AuthController.enableTwoFactorAuthStep1);

router.post("/enabletwofactorstep2", authVerify, AuthController.enableTwoFactorAuthStep2);

router.post("/validatetoken", authVerify, AuthController.validate2FAtoken);

router.get("/tfa-enabled", authVerify, AuthController.isTwoFA);

router.post("/tfa-disable", authVerify, AuthController.disable2FA)

module.exports = router;