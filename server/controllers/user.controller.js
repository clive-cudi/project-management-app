const { User } = require('../models/user.model');
const { v4: v4ID } = require('uuid');
const { getMultipleClientsInfo } = require("./client.controller");

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

const getClientIds = (req, res, next) => {
    const { usertoken } = req.body;

    User.findOne({uid: usertoken.uid}).then((user) => {
        if (user) {
            return res.status(200).json({
                success: true,
                message: "Fetched user associcated client IDs successfully",
                clients: user.clients,
                error: {
                    status: false,
                    code: null,
                }
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "User couldn't be found in DB!!",
                clients: null,
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    }).catch((get_user_clients_err) => {
        console.log(get_user_clients_err);
        return res.status(400).json({
            success: false,
            message: "Error finding user in DB",
            clients: null,
            error: {
                status: true,
                code: "db_error",
                debug: get_user_clients_err
            }
        })
    })
}

const getClients = (req, res, next) => {
    const { usertoken } = req.body;

    User.findOne({uid: usertoken.uid}).then((user) => {
        if (user) {
            // return res.status(200).json({
            //     success: true,
            //     message: "Fetched user associcated client IDs successfully",
            //     clients: user.clients,
            //     error: {
            //         status: false,
            //         code: null,
            //     }
            // })
            return getMultipleClientsInfo({body: {...req.body, cids: user.clients}}, res, next);
        } else {
            return res.status(404).json({
                success: false,
                message: "User couldn't be found in DB!!",
                clients: null,
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    }).catch((get_user_clients_err) => {
        console.log(get_user_clients_err);
        return res.status(400).json({
            success: false,
            message: "Error finding user in DB",
            clients: null,
            error: {
                status: true,
                code: "db_error",
                debug: get_user_clients_err
            }
        })
    })
}

module.exports = {
    updateProfilePicture,
    getClients
}