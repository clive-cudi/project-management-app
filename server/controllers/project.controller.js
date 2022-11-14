const { Project } = require('../models/project.model');
const { User } = require('../models/user.model');
const { v4: v4ID} = require('uuid');
const { generateResponse } = require('../helpers');
const e = require('express');


const getAllProjects = (req, res, next) => {
    const { usertoken } = req.body;


}

const createProject = (req, res, next) => {
    const {
        usertoken,
        name,
        stage,
        // client ID
        client,
        budget,
        start,
        finish,
        description
    } = req.body;

    User.findOne({uid: usertoken.uid}).then((user) => {
        if (user) {
            const projectID = `project_${v4ID()}`;

            const newProject = new Project({
                pid: projectID,
                name: name,
                stage: stage,
                info: {
                    created: {
                        time: start
                    },
                    expiry: {
                        time: finish
                    },
                    budget: budget,
                    description: description,
                    clients: [].push(client),
                    parent: {
                        uid: usertoken.uid
                        // include usertype of the parent
                    }
                },
                tasks: []
            });

            newProject.save().then((projectDoc) => {
                // update the user field with the project id
                User.updateOne(
                    {uid: usertoken.uid},
                    {$push: {
                        projects: projectDoc.pid ?? projectID
                    }}
                ).then(() => {
                    return generateResponse({
                        req,
                        res,
                        type: "success",
                        data: {
                            project: projectDoc
                        }
                    })
                }).catch((err) => {
                    return generateResponse({
                        req,
                        res,
                        type: "custom",
                        status: 400,
                        data: {
                            success: false,
                            message: "Failed to update the project list",
                            usertoken: {
                                user: null,
                                token: null
                            },
                            project: projectDoc,
                            error: {
                                status: true,
                                code: "project_list_update_failed",
                                debug: err
                            }
                        }
                    })
                })
            }).catch((error) => {
                return generateResponse({
                    req,
                    res,
                    type: "custom",
                    status: 400,
                    data: {
                        success: false,
                        message: "Task Creation Error",
                        usertoken: {
                            user: null,
                            token: null
                        },
                        error: {
                            status: true,
                            code: "task_creation_fail",
                            debug: error
                        }
                    }
                })
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                usertoken: {
                    user: null,
                    token: null,
                },
                error: {
                    status: true,
                    code: "user_not_found",
                }
            });
        }
    }).catch((e) => {
        return res.status(400).json({
            success: false,
            message: "Error Fetching user from DB!!",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "db_error",
                debug: e
            }
        });
    })
}

const getProjectById = (req, res, next) => {
    const { usertoken } = req.body;
    

}

const getProjectsById_multiple = (req, res, next) => {
    const { usertoken } = req.body;
    // project ids passed as string[]
}

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

    
}

module.exports = {
    createProject
};