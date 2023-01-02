const { Client } = require('../models/client.model');
const { User } = require('../models/user.model');
const { v4: v4ID } = require('uuid');
const { Project } = require('../models/project.model');

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
        lastName: secondName,
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
    const { usertoken, pid, cid } = req.body;

    try {
        Project.updateOne(
            {pid: pid},
            {$push: {
                "info.clients": cid
            }}
        ).then((pjct) => {
            Client.updateOne(
                {cid: cid},
                {$push: {
                    projects: pid
                }}
            ).then((client) => {
                if (client) {
                    User.updateOne(
                        {uid: usertoken.uid},
                        {$push: {
                            clients: cid
                        }}
                    ).then((usr) => {
                        return res.status(200).json({
                            success: true,
                            message: "Successfully added client to project",
                            project: {
                                id: pid,
                                client: cid
                            },
                            usertoken: {
                                user: usertoken,
                                token: usertoken.token
                            },
                            error: {
                                status: false,
                                code: null
                            }
                        })
                    })
                }
            })
        }).catch((er) => {
            throw er;
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Failed to add client",
            usertoken: {
                user: usertoken,
                token: usertoken.token
            },
            error: {
                status: true,
                code: "add_client_error",
                debug: error
            }
        })
    }
}

const removeFromProject = (req, res, next) => {
    const { usertoken, pid, cid } = req.body;

    try {
        Project.updateOne(
            {pid: pid},
            {$pull: {
                "info.clients": cid
            }}
        ).then((pjct) => {
            console.log("Found Project")
            Client.updateOne(
                {cid: cid},
                {$pull: {
                    projects: cid
                }}
            ).then((client) => {
                console.log("found client")
                if (client) {
                    User.updateOne(
                        {uid: usertoken.uid},
                        {$pull: {
                            clients: cid
                        }}
                    ).then((usr) => {
                        console.log("found usr")
                        return res.status(200).json({
                            success: true,
                            message: "Successfully removed client from project",
                            project: {
                                id: pid,
                                client: cid
                            },
                            usertoken: {
                                user: usertoken,
                                token: usertoken.token
                            },
                            error: {
                                status: false,
                                code: null
                            }
                        })
                    }).catch((user_update_client_err) => {
                        console.log("Usr error")
                        throw user_update_client_err;
                    })
                }
            }).catch((client_find_err) => {
                console.log("client find error")
                throw client_find_err;
            })
        }).catch((err) => {
            console.log("errororor")
            throw err;
        })
    } catch (exc) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Failed to remove client",
            usertoken: {
                user: usertoken,
                token: usertoken.token
            },
            error: {
                status: true,
                code: "remove_client_error",
                debug: exc
            }
        })
    }
}

const getClientInfo = (req, res, next) => {
    const { cid } = req.body;

    Client.findOne({cid: cid}).then((client) => {
        if (client) {
            return res.status(200).json({
                success: true,
                message: "Fetched client details successfully",
                client: client,
                error: {
                    status: false,
                    code: null
                }
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Client not found in DB!!",
                client: null,
                error: {
                    status: true,
                    code: "client_not_found"
                }
            })
        }
    }).catch((client_info_err) => {
        console.log(client_info_err);
        return res.status(400).json({
            success: false,
            message: "Failed to fetch client details",
            client: null,
            error: {
                status: false,
                code: "client_detail_fetch_error",
                debug: client_info_err
            }
        })
    })
}

const getMultipleClientsInfo = (req, res, next) => {
    const { cids } = req.body;

    console.log(cids);

    Client.find(
        {cid: {$in: cids}}
    ).then((clients) => {
        return res.status(200).json({
            success: true,
            message: "Fetched clients details successfully!!",
            clients: clients,
            error: {
                status: false,
                code: null
            }
        })
    }).catch((multiple_client_info_fetch_err) => {
        return res.status(400).json({
            success: false,
            message: "An error occured while fetching clients info",
            clients: null,
            error: {
                status: true,
                code: "db_error",
                debug: multiple_client_info_fetch_err
            }
        })
    })
}

module.exports = {
    createClient,
    addToProject,
    removeFromProject,
    getClientInfo,
    getMultipleClientsInfo
}