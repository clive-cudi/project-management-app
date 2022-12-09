const { User } = require('../models/user.model');
const { v4: v4ID } = require('uuid');

const updateProfilePicture = (req, res, next) => {
    const { usertoken, picUrl} = req.body;

    User.updateOne(
        {uid: usertoken.uid},
        {$set: {
            profilePicture: picUrl ?? null
        }}
    ).then(() => {
        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            picUrl: picUrl,
            error: {
                status: false,
                code: null
            }
        })
    }).catch((err) => {
        return res.status(400).json({
            success: false,
            message: "Failed to update profile picture",
            picUrl: null,
            error: {
                status: true,
                code: "profile_picture_update_fail",
                debug: err
            }
        })
    });
}

module.exports = {
    updateProfilePicture
}