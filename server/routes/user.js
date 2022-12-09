const router = require('express').Router();
const authVerify = require("../middleware/auth_verify");
const UserController = require('../controllers/user.controller');

router.post("/update-profile-picture", authVerify, UserController.updateProfilePicture);

module.exports = router;