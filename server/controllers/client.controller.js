const { Client } = require('../models/client.model');
const { User } = require('../models/user.model');
const { v4: v4ID } = require('uuid');

const createClient = (req, res, next) => {
    const {
        usertoken,
        firstName,
        secondName,
        title,
        email,
        businessName,
        mobile
    } = req.body;

    const newClientID = `client_${v4ID()}`;

    const newClient = new Client({
        cid: newClientID,
        parentID: usertoken.uid,
        firstName: firstName,
        secondName: secondName,
        title: title,
        email: email,
        businessName: businessName,
        mobile: mobile,
        projects: []
    });

    newClient.save().then((client) => {
        // update the parent user document client list
        User.updateOne(
            {uid: usertoken.uid},
            {$push: {
                clients: client.cid ?? newClientID
            }}
        ).then(() => {
            return res.status(200).json({
                success: true,
                message: "Client created successfully",
                client: client,
                error: {
                    status: false,
                    code: null
                }
            })
        }).catch((err_parent_update) => {
            return res.status(400).json({
                success: false,
                message: "Failed to update client list",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "parent_client_list_update_fail",
                    debug: err_parent_update
                }
            })
        })
    }).catch((client_create_err) => {
        return res.status(400).json({
            success: false,
            message: "Client Creation Error",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "client_init_fail",
                debug: client_create_err
            }
        })
    })
}

const addToProject = (req, res, next) => {
    const { usertoken, pid } = req.body;

    
}

module.exports = {
    createClient
}