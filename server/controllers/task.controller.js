const authVerify = require('../middleware/auth_verify');
const { User } = require('../models/user.model');
const { v4: v4ID } = require('uuid');
const { Task } = require('../models/task.model');
const { generateResponse } = require('../helpers/index');
const e = require('express');

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
            // if project === me, then assign the task directly to the user
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
const getTaskById = (req, res, next) => {
    const { tid } = req.params;
    const { usertoken } = req.body;
    
    Task.findOne({taskID: tid}).then((task) => {
        if (task) {
            return generateResponse({
                req,
                res,
                type: "success",
                data: {
                    task: task._doc
                }
            })
        } else {
            return generateResponse({
                req,
                res,
                type: "not_found_db"
            })
        }
    }).catch((error) => {
        return generateResponse({
            req,
            res,
            type: "db_error",
            error
        })
    });
}

const getMultipleTasksById = (req, res, next) => {
    const { tids, usertoken } = req.body;

    // tids: string[]
    Task.find({taskID: {$in: tids}}).then((tasks) => {
        console.log("Tasks")
        console.log(tasks)
        if (!tasks) {
            console.log("no tasks")
        }
        return generateResponse({
            req,
            res,
            type: "success",
            data: {
                tasks: tasks.map((tsk) => tsk)
            }
        })
    }).catch((err) => {
        if (err) {
            console.log(err);
            return generateResponse({
                req,
                res,
                type: "db_error"
            })
        }
    })
}

const getMyTasksById = (req, res, next) => {
    const { usertoken } = req.body;

    // find the user by uid in db
    User.findOne({uid: usertoken.uid}).then((user) => {
        if (user) {
            const tasks = user._doc.tasks;

            console.log("req: ")
            req = {...req, body: {...req.body, tids: tasks}};

            console.log(req);

            // pass on the task list to the getMultipleTasksById() controller

            return getMultipleTasksById(req, res, next);
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

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    getMultipleTasksById,
    getMyTasksById
}