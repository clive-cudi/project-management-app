const authVerify = require('../middleware/auth_verify');
const { v4: v4ID } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const signup = (req, res, next) => {
    // collect credentials
    console.log(req.body);
    const { username, email, password, confirm, usertype = "" } = req.body;
    let existing_user_status = false;

    // confirm credentials

    if (!req.body.username || !req.body.email || !req.body.password || !req.body.confirm) {
        return res.status(400).json({
            success: false,
            message: "Missing credentials",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "missing_credentials"
            }
        })
    }

    console.log({email, username, password, confirm});

    // check if passwords match

    if (password !== confirm) {
        return res.status(403).json({
            success: false,
            message: "Passwords do not match",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "password_mismatch"
            }
        });
    }

    User.findOne({email: email}, async (err, user) => {
        if (err) {
            console.log(err);
            return res.json({success: false, error: {status: true, code: "db_error"}});
        }

        if (user !== null) {
            console.log("User exists!!");
            existing_user_status = true;
            return res.status(400).json({
                success: false,
                message: `User with the email: ${email}, already exists.`,
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "user_exists"
                }
            });
        } else {
            const uid = v4ID();

            // encrypt password
            const encrypted_password = await bcrypt.hash(password, 10);

            const user = new User({
                username,
                email,
                password: encrypted_password,
                uid,
                profilePicUrl: "",
                usertype: usertype.toLowerCase() === "organization" || usertype.toLowerCase() === "individual" ? usertype.toLowerCase() : "individual",
                isVerified: false
            });

            user.save().then((r) => {
                const token = jwt.sign(
                    {
                        uid: uid,
                        email: `${email}`,
                        username: username
                    },
                    process.env.JWT_TOKEN_KEY ?? "hfughrvcsliidv8eiiweeopi",
                    { expiresIn: "1h" }
                );

                const { twoFA, ...dataToInclude} = user?._doc;

                console.log(dataToInclude);

                return res.json({
                    success: true,
                    message: "User Created",
                    usertoken: {
                        dataToInclude,
                        token
                    },
                    error: {
                        status: false,
                        code: null || ""
                    }
                });
            }).catch((err)=> {
                console.log(err);
                return res.status(400).json({
                    success: false,
                    message: "Error pushing user to DB",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "db_error",
                        debug: err
                    }
                })
            })
        }
    }).clone()
        .catch((err)=> {
            console.log(err);
            return res.status(400).json({
                success: false,
                message: "Error creating user",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "db_error",
                    debug: err
                }
            });
        });
}

const login = (req, res, next) => {
    const { username = "", email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing credentials",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "missing_credentials"
            }
        })
    }

    User.findOne({ email: email}).then(async (user) => {
        console.log({user: {...user}});
        if (user) {
            if (user?.password && ( await bcrypt.compare(password, user?.password))) {
                const token = jwt.sign(
                    {
                        uid: user.uid,
                        email: `${user.email}`,
                        username: `${user.username}`
                    },
                    process.env.JWT_TOKEN_KEY ?? "hfughrvcsliidv8eiiweeopi",
                    {
                        expiresIn: "1h"
                    }
                );

                const { twoFA, password, ...dataToInclude} = user._doc;

                return res.json({
                    success: true,
                    message: "Successful Login",
                    usertoken: {
                        user: {...dataToInclude, twoFA: {status: twoFA.status}},
                        token: token
                    },
                    error: {
                        status: false,
                        message: null || "",
                        code: null
                    }
                })
            } else {
                return res.json({
                    success: false,
                    message: "Invalid credentials",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "invalid_credentials"
                    }
                })
            }
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
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "An error occurred",
            usertoken: {
                user: null,
                token: null
            },
            error: {
                status: true,
                code: "db_error",
                debug: err
            }
        });
    });
}

const verify = (req, res, next) => {
    const { 
        profilePicUrl = "",
        usertype,
        about = "",
        phone = "",
        language = "en",
        timezone = "Africa/Nairobi",
        usertoken,
        gender = "",
        skills = [],
        address: {
            country = "KE",
            location = "Nairobi",
            street = ""
        }
        } = req.body;

    // usertype = "individual" | "organization"

    User.findOne({uid: usertoken.uid, email: usertoken.email}).then(async (user) => {
        if (user) {
            User.updateOne(
                {uid: usertoken.uid},
                {$set: {
                    profilePicUrl: profilePicUrl,
                    about: about,
                    "info.address": {
                        country: country,
                        location: location,
                        street: street
                    },
                    "info.skills": Array.from([...new Set([...user.info.skills, ...skills])]),
                    "info.gender": gender,
                    "info.timezones": {
                        default: timezone,
                        other: Array.from([...new Set(user.info.timezones.other.includes(timezone) ? user.info.timezones.other : [...user.info.timezones.other, timezone])])
                    },
                    "info.phone": phone,
                    "info.language": language,
                    isVerified: true
                }}
            ).then(()=> {
                return res.status(200).json({
                    success: true,
                    message: "Verification Done",
                    usertoken: {
                        user: user,
                        token: usertoken.token,
                    },
                    error: {
                        status: false,
                        code: null
                    }
                });
            }).catch((error) => {
                return res.status(400).json({
                    success: false,
                    message: "Verification Error",
                    usertoken: {
                        user: null,
                        token: null
                    },
                    error: {
                        status: true,
                        code: "verification_update_fail",
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
                    token: null
                },
                error: {
                    status: true,
                    code: "user_not_found"
                }
            })
        }
    })
};

const enableTwoFactorAuthStep1 = (req, res, next) => {
    const secret = speakeasy.generateSecret();
    const { usertoken } = req.body;
    
    qrcode.toDataURL(secret.otpauth_url, (err, qrImg) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Error generating QR code",
                usertoken: {
                    user: {...usertoken},
                    token: usertoken.token
                },
                error: {
                    status: true,
                    code: "qr_code_gen_error",
                    debug: err
                }
            })
        }

        return res.status(200).json({
            success: true,
            message: "QR Code generated successfully",
            usertoken: {
                user: {...usertoken},
                token: usertoken.token
            },
            resdata: {
                qrImg,
                secret
            },
            error: {
                status: false,
                code: null
            }
        })
    })
};

const enableTwoFactorAuthStep2 = (req, res, next) => {
    const { base32secret, usertoken, totptoken } = req.body;

    const isVerified = speakeasy.totp.verify({
        secret: base32secret,
        encoding: "base32",
        token: totptoken
    });

    console.log(`base32: ${base32secret}\ntoken: ${totptoken}`)

    if (isVerified) {
        User.findOne({email: usertoken.email, uid: usertoken.uid}).then((user) => {
            if (user) {
                // update the 2FA field in schema
                User.updateOne(
                    {uid: usertoken.uid},
                    {$set: {
                        "twoFA.status": true,
                        "twoFA.secret": base32secret
                    }}
                ).then(()=> {
                    return res.status(200).json({
                        success: true,
                        message: "2FA Enabled successfully!",
                        usertoken: {
                            user: {...usertoken},
                            token: usertoken.token
                        },
                        error: {
                            status: false,
                            code: null
                        }
                    })
                }).catch((err) => {
                    return res.status(400).json({
                        success: false,
                        message: "2FA update DB failed",
                        usertoken: {
                            user: {...usertoken},
                            token: usertoken.token
                        },
                        error: {
                            status: true,
                            code: "update_db_2fa_error",
                            debug: err
                        }
                    })
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: "User does not exist in DB!",
                    usertoken: {
                        user: {...usertoken},
                        token: usertoken.token
                    },
                    error: {
                        status: true,
                        code: "user_not_found_2fa"
                    }
                })
            }
        }).catch((err) => {
            return res.status(400).json({
                success: false,
                message: "Error fetching user from DB!",
                usertoken: {
                    user: {...usertoken},
                    token: usertoken.token
                },
                error: {
                    status: true,
                    code: "db_error",
                    debug: err
                }
            })
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Failed to activate 2FA! Invalid Token!",
            usertoken: {
                user: {...usertoken},
                token: usertoken.token
            },
            error: {
                status: true,
                code: "invalid_2FA_token"
            }
        })
    }
}

const validate2FAtoken = (req, res, next) => {
    const { usertoken, totptoken } = req.body;

    User.findOne({email: usertoken.email}).then((user) => {
        if (user) {
            // check if user has 2FA enabled, if not throw Error
            if (user.twoFA.status == true || user.twoFA.secret.trim() != "") {
                const secret_2FA = user.twoFA.secret;

                const isValidated = speakeasy.totp.verify({
                    secret: secret_2FA,
                    encoding: "base32",
                    token: totptoken
                });

                if (isValidated) {
                    return res.status(200).json({
                        success: true,
                        message: "Successfull 2FA Login",
                        usertoken: {
                            user: usertoken,
                            token: usertoken.token
                        },
                        error: {
                            status: false,
                            code: null
                        }
                    })
                } else {
                    return res.status(403).json({
                        success: false,
                        message: "Invalid 2FA token!",
                        usertoken: {
                            user: usertoken,
                            token: usertoken.token
                        },
                        error: {
                            status: true,
                            code: "invalid_2fa_token"
                        }
                    })
                };
            } else {
                return res.status(400).json({
                    success: false,
                    message: "2FA not enabled!",
                    usertoken: {
                        user: usertoken,
                        token: usertoken.token
                    },
                    error: {
                        status: true,
                        code: "2fa_disabled"
                    }
                });
            }
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
        })
    });
}

const isTwoFA = (req, res, next) => {
    const { usertoken } = req.body;

    User.findOne({email: usertoken.email}).then((user) => {
        if (user) {
            return res.status(200).json({
                success: true,
                isTwoFA: user.twoFA ?? false,
                error: {
                    status: false,
                    code: null
                }
            })
        } else {
            return res.status(404).json({
                success: false,
                isTwoFA: false,
                error: {
                    status: true,
                    code: "user_not_found",
                }
            })
        }
    }).catch((error) => {
        console.log(error);
        return res.status(403).json({
            success: false,
            isTwoFA: false,
            error: {
                status: true,
                code: "db_error",
                debug: error
            }
        })
    })
};

const disable2FA = (req, res, next) => {
    const {usertoken, totptoken} = req.body;

    User.findOne({email: usertoken.email}).then((user) => {
        if (user) {
            // check if user has 2FA enabled, if not throw Error
            if (user.twoFA.status == true || user.twoFA.secret.trim() != "") {
                const secret_2FA = user.twoFA.secret;

                const isValidated = speakeasy.totp.verify({
                    secret: secret_2FA,
                    encoding: "base32",
                    token: totptoken
                });

                if (isValidated) {
                    User.updateOne(
                        {email: usertoken.email},
                        {$set: {
                            twoFA: {
                                status: false,
                                secret: ""
                            }
                        }}
                    ).then(() => {
                        return res.status(200).json({
                            success: true,
                            message: "Successfull 2FA Disable!!",
                            usertoken: {
                                user: usertoken,
                                token: usertoken.token
                            },
                            error: {
                                status: false,
                                code: null
                            }
                        })
                    }).catch((error) => {
                        return res.status(500).json({
                            success: false,
                            message: "2FA Disable Failed!!",
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
                } else {
                    return res.status(403).json({
                        success: false,
                        message: "Invalid 2FA token!",
                        usertoken: {
                            user: usertoken,
                            token: usertoken.token
                        },
                        error: {
                            status: true,
                            code: "invalid_2fa_token"
                        }
                    })
                };
            } else {
                return res.status(400).json({
                    success: false,
                    message: "2FA not enabled!",
                    usertoken: {
                        user: usertoken,
                        token: usertoken.token
                    },
                    error: {
                        status: true,
                        code: "2fa_disabled"
                    }
                });
            }
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
        })
    });
}

module.exports = {
    signup,
    login,
    verify,
    enableTwoFactorAuthStep1,
    enableTwoFactorAuthStep2,
    validate2FAtoken,
    isTwoFA,
    disable2FA
}