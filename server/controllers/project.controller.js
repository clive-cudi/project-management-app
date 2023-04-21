const { Project } = require('../models/project.model');
const { User } = require('../models/user.model');
const { v4: v4ID} = require('uuid');
const { generateResponse } = require('../helpers');
const e = require('express');


const getAllProjects = (req, res, next) => {
    const { usertoken } = req.body;

    User.findOne({uid: usertoken.uid}).then((user) => {
        if (user) {
            return res.status(200).json({
                success: true,
                message: "Fetched all project ids successfully",
                pids: user.projects,
                error: {
                    status: false,
                    code: null
                }
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                pids: [],
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    }).catch((w) => {
        return res.status(404).json({
            success: false,
            message: "Error fetching user from DB",
            pids: [],
            error: {
                status: true,
                code: "db_error",
                debug: w
            }
        })
    });
}

const createProject = (req, res, next) => {
    const {
        usertoken,
        name,
        stage,
        // client ID
        clients,
        budget,
        start,
        finish,
        description
    } = req.body;

    if (!name || !start || !finish) {
        return res.status(403).json({
            success: false,
            message: "Missing details",
            usertoken: {
                user: null,
                token: null
            },
            project: null,
            error: {
                status: true,
                code: "missing_details",
                debug: null
            }
        })
    }

    User.findOne({uid: usertoken.uid}).then((user) => {
        if (user) {
            const projectID = `project_${v4ID()}`;

            console.log(typeof clients);
            console.log(`clients:
                ${clients}
            `)

            const newProject = new Project({
                pid: projectID,
                name: name,
                stage: stage,
                contributors: {
                    teams: [],
                    individuals: [usertoken.uid]
                },
                info: {
                    created: {
                        time: start
                    },
                    expiry: {
                        time: finish
                    },
                    budget: budget,
                    description: description,
                    clients: [...clients],
                    parent: {
                        uid: usertoken.uid
                        // include usertype of the parent
                    },
                    progress: 0,
                    status: "active"
                },
                tasks: []
            });

            newProject.save().then((projectDoc) => {
                // update the user field with the project id
                User.updateOne(
                    {uid: usertoken.uid},
                    {$addToSet: {
                        projects: projectDoc.pid ?? projectID
                    }}
                ).then(() => {
                    return generateResponse({
                        req,
                        res,
                        type: "Successfully created project " + projectDoc.name ?? name,
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
                console.log(error);
                return generateResponse({
                    req,
                    res,
                    type: "custom",
                    status: 400,
                    data: {
                        success: false,
                        message: "Project Creation Error",
                        usertoken: {
                            user: null,
                            token: null
                        },
                        error: {
                            status: true,
                            code: "project_creation_fail",
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
        console.log(e);
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
    const { usertoken, pid } = req.body;

    // [TODO]: add a constraint, such that the user can view the project only if is a contributor [for private projects]
    
    // [TODO]: add project availability property => "public"[default] | "private"
    Project.findOne({pid: pid}).then((pjct) => {
        if (pjct) {
            return res.status(200).json({
                success: true,
                message: "Found project",
                project: pjct,
                error: {
                    status: false,
                    code: null
                }
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Project not found in DB",
                project: null,
                error: {
                    status: true,
                    code: "not_found"
                }
            })
        }
    }).catch((db_err) => {
        return res.status(400).json({
            success: false,
            message: "DB error Occurred",
            project: null,
            error: {
                status: true,
                code: "db_error",
                debug: db_err
            }
        })
    })
}

const getProjectsById_multiple = (req, res, next) => {
    const { usertoken, pids } = req.body;
    // project ids passed as string[]

    Project.find({pid: {
        $in: pids
    }}).then((pjcts) => {
        if (pjcts) {
            return res.status(200).json({
                success: true,
                message: "Fetched projects successfully",
                projects: pjcts,
                error: {
                    status: false,
                    code: null
                }
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "No projects found",
                projects: [],
                error: {
                    status: true,
                    code: "not_found"
                }
            })
        }
    }).catch((projects_db_err) => {
        return res.status(400).json({
            success: false,
            message: "DB error occurred",
            projects: [],
            error: {
                status: true,
                code: "db_error",
                debug: projects_db_err
            }
        });
    })
}

const getAllProjectsDetails = (req, res, next) => {
    const { usertoken } = req.body;

    User.findOne({uid: usertoken.uid}).then((usr) => {
        if (usr) {
            // get all project id's associated with the user
            Project.find({pid: {
                $in: usr.projects ?? []
            }}).then((pjcts) => {
                if (pjcts.length > 0) {
                    return res.status(200).json({
                        success: true,
                        message: "Fetched all project Details successfully",
                        projects: pjcts,
                        error: {
                            status: false,
                            code: null
                        }
                    })
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "No Projects found",
                        projects: [],
                        error: {
                            status: true,
                            code: "not_found",
                            debug: null
                        }
                    })
                }
            }).catch((pjct_db_err) => {
                return res.status(400).json({
                    success: false,
                    message: "Projects DB error occurred",
                    projects: [],
                    error: {
                        status: true,
                        code: "db_error",
                        debug: pjct_db_err
                    }
                })
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found in DB",
                projects: [],
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    }).catch((usr_db_err) => {
        return res.status(400).json({
            sucess: false,
            message: "DB error occurred",
            projects: [],
            error: {
                status: true,
                code: "db_error",
                debug: usr_db_err
            }
        })
    })
};

// adding a contributor(user) to a project
const addIndividualContributor = async (req, res) => {
    const { usertoken, pid, uid } = req.body;
    let userExists = false;

    // check if user exists
    await User.findOne({uid: uid, usertype: "individual"}).then((usr) => {
        if (usr) {
            userExists = true;
            return
        } else {
            return res.status(404).json({
                success: false,
                message: "User couldn't be found in DB!!",
                clients: null,
                error: {
                  status: true,
                  code: "user_not_found",
                },
            });
        }
    }).catch((user_find_err) => {
        console.log(user_find_err);
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
                debug: user_find_err
            }
        });
    });

    if (!userExists) {
        return;
    }

    // prerequisite
    // the user must be an individual
    // future support for organization
    Project.findOneAndUpdate({pid: pid}, {$addToSet: {
        "contributors.individuals": uid
    }}).then((updated_project) => {
        if (updated_project) {
            // update user project fields
            User.findOneAndUpdate({uid: uid, usertype: "individual"}, {
                $addToSet: {
                    "projects": updated_project.pid ?? pid
                }
            }).then((updated_user) => {
                if (updated_user) {
                    return res.status(200).json({
                        success: true,
                        message: `Successfully added as contributor to pid: ${pid}`,
                        project: updated_project,
                        contributors: updated_project.contributors,
                        error: {
                            status: false,
                            code: null
                        }
                    })
                } else {
                    // just incase yk...edge case stuff
                    return res.status(404).json({
                        success: false,
                        message: "User couldn't be found in DB!!",
                        clients: null,
                        error: {
                          status: true,
                          code: "user_not_found",
                        },
                    });
                }
            }).catch((update_user_pjct_list_err) => {
                console.log(update_user_pjct_list_err);
                return res.status(400).json({
                    success: false,
                    message: "Failed to update the project list at user",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    project: null,
                    error: {
                        status: true,
                        code: "project_list_update_failed",
                        debug: update_user_pjct_list_err
                    }
                });
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Project not found in DB",
                project: null,
                error: {
                    status: true,
                    code: "not_found"
                }
            })
        }
    }).catch((project_find_update_err) => {
        console.log(project_find_update_err);
        return res.status(400).json({
            success: false,
            message: "DB error Occurred",
            project: null,
            error: {
                status: true,
                code: "db_error",
                debug: project_find_update_err
            }
        })
    })
}

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    getProjectsById_multiple,
    getAllProjectsDetails,
    addIndividualContributor
};