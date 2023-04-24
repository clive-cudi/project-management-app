const router = require('express').Router();
const authVerify = require("../middleware/auth_verify");
const UserController = require('../controllers/user.controller');

router.post("/update-profile-picture", authVerify, UserController.updateProfilePicture);

router.get("/get-clients", authVerify, UserController.getClients);

router.get("/profile/:uid", authVerify, UserController.fetchUserProfile);

router.post("/profiles", authVerify, UserController.fetchMultipleUserProfiles);

module.exports = router;