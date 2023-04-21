const authVerify = require('../middleware/auth_verify');
const { User } = require('../models/user.model');
const { v4: v4ID } = require('uuid');
const { Task } = require('../models/task.model');
const { generateResponse } = require('../helpers/index');
const e = require('express');
const { Project } = require('../models/project.model');

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
    const { usertoken, name, description, start, finish, priority, type, project: targetProject = "" } = req.body;

    const project = targetProject === "" ? "me" : targetProject;
    
    User.findOne({uid: usertoken.uid}).then((user) => {
        if (user) {
            const taskID = `task_${v4ID()}`;

            const newTask = new Task({
                taskID,
                name,
                description,
                status: "todo",
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
                if (project === "me") {
                    console.log("Me project")
                    // assign the task directly to the user => rendered to <TaskSummary />
                    User.updateOne(
                        {uid: usertoken.uid},
                        {$addToSet: {
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
                } else {
                    // update the task list in the project given
                    console.log("Project task")
                    Project.updateOne(
                        {pid: project},
                        {$addToSet: {
                            tasks: taskDoc.taskID ?? taskID
                        }}
                    ).then((updatedProject) => {
                        return res.status(200).json({
                            success: true,
                            message: "Task Created!!",
                            task: taskDoc,
                            error: {
                                status: false,
                                code: null
                            }
                        })
                    }).catch((project_task_update_error) => {
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
                                debug: project_task_update_error
                            }
                        })
                    })
                }
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

const removeTask = (req, res, next) => {
    const { usertoken } = req.body;
    const { tid } = req.params || req.body;

    if (tid) {
        console.log(tid);
        // clear the task in the Task collection
        // clear the task in the User.tasks array
        Task.findOneAndDelete({taskID: tid}).then((task) => {
            console.log(task);
            if (task) {
                User.updateOne(
                    {uid: usertoken.uid},
                    {$pull: {tasks: tid}}
                ).then(() => {
                    return res.status(200).json({
                        success: true,
                        message: "Task Deleted!!",
                        task: task,
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
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Task not found",
                    usertoken: {
                        user: null,
                        token: null,
                    },
                    error: {
                        status: true,
                        code: "task_not_found",
                    }
                })
            }
        }).catch((error) => {
            return res.status(400).json({
                success: false,
                message: "Task Deletion Error",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "task_deletion_fail",
                    debug: error
                }
            })
        })
    }
}

const deleteTask = (req, res, next) => {
    const { usertoken, tid } = req.body;

    Task.findOneAndDelete({taskID: tid}).then((delTask) => {
        const taskParentID = delTask.parent.project.pid;

        if (taskParentID === "me") {
            // update the user schema
            User.updateOne(
                {uid: usertoken.uid},
                {$pull: {
                    tasks: tid
                }}
            ).then((usr) => {
                return res.status(200).json({
                    success: true,
                    message: "Task Deleted!!",
                    task: delTask,
                    error: {
                        status: false,
                        code: null
                    }
                })
            }).catch((usr_task_list_update_error) => {
                return res.status(400).json({
                    success: false,
                    message: "Failed to update task list",
                    task: null,
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "task_list_update_fail",
                        debug: usr_task_list_update_error
                    }
                })
            })
        } else {
            // update the project schema
            
            Project.updateOne(
                {pid: taskParentID},
                {$pull: {
                    tasks: tid
                }}
            ).then((pjct) => {
                return res.status(200).json({
                    success: true,
                    message: "Task Deleted!!",
                    task: delTask,
                    error: {
                        status: false,
                        code: null
                    }
                });
            }).catch((pjct_task_list_update_error) => {
                return res.status(400).json({
                    success: false,
                    message: "Failed to update task list",
                    task: null,
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "task_list_update_fail",
                        debug: pjct_task_list_update_error
                    }
                })
            })
        }
    }).catch((task_find_error) => {
        return res.status(404).json({
            success: false,
            message: "Task not found",
            task: null,
            usertoken: {
                user: null,
                token: null,
            },
            error: {
                status: true,
                code: "task_not_found",
                debug: task_find_error
            }
        })
    })
}

const removeMultiple = (req, res, next) => {
    const { usertoken, tids } = req.body;

    Task.find({taskID: {$in: tids.length > 0 ? tids : []}}).then((selectTasks) => {
        const personalTasks = selectTasks.filter((tsk) => tsk.parent.project.pid === "me").map((persTask) => persTask.taskID);
        const projectBasedTasks = selectTasks.filter((tsk__) => tsk__.parent.project.pid !== "me");

        // clear personal tasks
        User.updateOne(
            {uid: usertoken.uid},
            {$pullAll: {
                tasks: personalTasks
            }}
        ).then(() => {
            // clear project based tasks
            Project.updateMany(
                {pid: {
                    $in: projectBasedTasks.map((pbt) => pbt.parent.project.pid)
                }},
                {$pullAll: {
                    tasks: projectBasedTasks.map((pbtsk) => pbtsk.taskID)
                }}
            ).then((pjct_updated) => {
                Task.deleteMany({taskID: {$in: tids.length > 0 ? tids : []}}).then(() => {
                    return res.status(200).json({
                        success: true,
                        message: "Tasks Deleted!!",
                        tasks: selectTasks,
                        error: {
                            status: false,
                            code: null
                        }
                    })
                }).catch((tasks_delete_error) => {
                    return res.status(400).json({
                        success: false,
                        message: "Failed to delete tasks",
                        tasks: selectTasks,
                        error: {
                            status: true,
                            code: "delete_task_error",
                            debug: tasks_delete_error
                        }
                    })
                })
            }).catch((pjct_update_err) => {
                return res.status(400).json({
                    success: false,
                    message: "Failed to update task list at project level",
                    tasks: null,
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "task_list_update_fail",
                        debug: pjct_update_err
                    }
                })
            })
        }).catch((usr_update_err) => {
            return res.status(400).json({
                success: false,
                message: "Failed to update task list at user level",
                tasks: null,
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "task_list_update_fail",
                    debug: usr_update_err
                }
            })
        })
    }).catch((task_find_error) => {
        return res.status(404).json({
            success: false,
            message: "Task not found",
            tasks: null,
            usertoken: {
                user: null,
                token: null,
            },
            error: {
                status: true,
                code: "task_not_found",
                debug: task_find_error
            }
        })
    })
}
//     Task.deleteMany({taskID: {$in: tids.length > 0 ? tids : []}}).then((deletedTasks) => {
//         User.updateOne(
//             {uid: usertoken.uid},
//             {$pullAll: {
//                 tasks: tids.length > 0 ? tids : []
//             }}
//         ).then((usr) => {

//         })
//     })

const updateTaskStatus = (req, res, next) => {
    const { usertoken } = req.body;
    const { tid } = req.body;
    const { status } = req.body;
    const allowedStatuses = ["todo", "pending", "done"];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
                success: false,
                message: `Please provide a valid status: ${allowedStatuses.toString()}`,
                task: null,
                error: {
                    status: true,
                    code: "invalid_status",
                    debug: null
                }
            });
    };
    
    Task.findOneAndUpdate(
        {taskID: tid},
        {$set: {
            status: status
        }}
    ).then((updated_task) => {
        console.log(tid);
        console.log(updated_task)
        return res.status(200).json({
            success: true,
            message: `Task status updated to ${status}`,
            task: updated_task,
            taskStatus: status,
            error: {
                status: false,
                code: null
            }
        });
    }).catch((status_update_error) => {
        return res.status(400).json({
            success: false,
            message: "Task status update failed",
            task: null,
            taskStatus: status,
            error: {
                status: true,
                code: "task_status_update_fail",
                debug: status_update_error
            }
        });
    })
};

const updateMultipleTaskStatuses = (req, res, next) => {
    const { tids, status } = req.body;
    const allowedStatuses = ["todo", "pending", "done"];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
                success: false,
                message: `Please provide a valid status: ${allowedStatuses.toString()}`,
                task: null,
                error: {
                    status: true,
                    code: "invalid_status",
                    debug: null
                }
            });
    };

    Task.updateMany(
        {taskID: {$in: tids}},
        {$set: {
            status: status
        }}
    ).then(() => {
        console.log(tids);
        return res.status(200).json({
            success: true,
            message: `Task status updated to ${status}`,
            tasks: tids,
            taskStatus: status,
            error: {
                status: false,
                code: null
            }
        });
    }).catch((tasks_status_update_err) => {
        return res.status(400).json({
            success: false,
            message: "Task status update failed",
            tasks: tids,
            taskStatus: status,
            error: {
                status: true,
                code: "task_status_update_fail",
                debug: tasks_status_update_err
            }
        });
    })
}

const updateTaskPriority = (req, res, next) => {
    const { usertoken } = req.body;
    const { tid, priority } = req.body;
    const allowedPriorities = ["low", "medium", "high"];

    if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({
            success: false,
            message: `Please provide a valid priority ${allowedPriorities.toString()}`,
            task: null,
            error: {
                status: true,
                code: "invalid_priority"
            }
        })
    };

    Task.findOneAndUpdate(
        {taskID: tid},
        {$set: {
            priority: priority
          }
        }).then((updated_task) => {
            return res.status(200).json({
                success: true,
                message: "Successfully updated task priority to " + priority,
                task: updated_task,
                taskPriority: priority,
                error: {
                    status: false,
                    code: null
                }
            });
        }).catch((task_priority_update_err) => {
            console.log(task_priority_update_err);
            return res.status(400).json({
                success: false,
                message: "Failed to update task priority",
                task: null,
                error: {
                    status: true,
                    code: "task_priority_update_fail",
                    debug: task_priority_update_err
                }
            })
        });
};

const updateMultipleTaskPriorities = (req, res, next) => {
    const { tids, priority } = req.body;
    const allowedPriorities = ["low", "medium", "high"];

    if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({
            success: false,
            message: `Please provide a valid priority ${allowedPriorities.toString()}`,
            task: null,
            error: {
                status: true,
                code: "invalid_priority"
            }
        })
    };

    Task.updateMany(
        {taskID: {$in: tids}},
        {$set: {
            priority: priority
        }}
    ).then(() => {
        return res.status(200).json({
            success: true,
            message: "Successfully updated task priority to " + priority,
            tasks: tids,
            taskPriority: priority,
            error: {
                status: false,
                code: null
            }
        });
    }).catch((update_task_priority_err) => {
        console.log(update_task_priority_err);
        return res.status(400).json({
            success: false,
            message: "Failed to update task priority",
            tasks: tids,
            taskPriority: priority,
            error: {
                status: true,
                code: "task_priority_update_fail",
                debug: update_task_priority_err
            }
        })
    })
}

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    getMultipleTasksById,
    getMyTasksById,
    removeTask,
    deleteTask,
    removeMultiple,
    updateTaskStatus,
    updateTaskPriority,
    updateMultipleTaskStatuses,
    updateMultipleTaskPriorities
}
