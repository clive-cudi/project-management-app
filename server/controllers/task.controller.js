const authVerify = require('../middleware/auth_verify');
const User = require('../models/user.model');
const { v4: v4ID } = require('uuid');
const Task = require('../models/task.model');

const getAllTasks = (req, res, next) => {
    const { usertoken } = req.body;

    // find the user by uid in db
    User.findOne({uid: usertoken.uid}).then((user) => {
        if (user) {
            return res.status(200).json({
                success: true,
                message: "Fetched Task Details Successfully",
                tasks: user._doc.tasks,
                error: {
                    status: false,
                    code: null
                }
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
            })
        }
    }).catch((error) => {
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
                debug: error
            }
        });
    })
}

const createTask = (req, res, next) => {
    // generate a new unique taskID and add it to the list of the chosen user
    const { usertoken, name, description, start, finish, priority, type, project } = req.body;
    
    User.findOne({uid: usertoken.uid}).then((user) => {
        if (user) {
            const taskID = `task_${v4ID()}`;

            const newTask = new Task({
                taskID,
                name,
                description,
                priority,
                type,
                parent: {
                    project: {
                        pid: project
                    }
                },
                info: {
                    created: {
                        time: start
                    },
                    expiry: {
                        time: finish
                    }
                }
            });

            // update the parent project task field with the TID
            newTask.save().then((taskDoc) => {
                User.updateOne(
                    {uid: usertoken.uid},
                    {$push: {
                        tasks: taskDoc.taskID ?? taskID
                    }}
                ).then(() => {
                    return res.status(200).json({
                        success: true,
                        message: "Task Created!!",
                        task: taskDoc,
                        error: {
                            status: false,
                            code: null
                        }
                    })
                }).catch((err) => {
                    return res.status(400).json({
                        success: false,
                        message: "Failed to update task list",
                        usertoken: {
                            user: null,
                            token: null
                        },
                        error: {
                            status: true,
                            code: "task_list_update_fail",
                            debug: err
                        }
                    })
                })
            }).catch((error) => {
                return res.status(400).json({
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
    }).catch((error) => {
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
                debug: error
            }
        });
    })
};

// getTask/[tid]

module.exports = {
    getAllTasks,
    createTask
}