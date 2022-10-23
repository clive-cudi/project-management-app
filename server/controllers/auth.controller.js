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

                return res.json({
                    success: true,
                    message: "User Created",
                    usertoken: {
                        ...user?._doc,
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

                console.log({token});

                return res.json({
                    success: true,
                    message: "Successful Login",
                    usertoken: {
                        user,
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
            res.status(403).json({
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

        res.status(200).json({
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
}

module.exports = {
    signup,
    login,
    verify,
    enableTwoFactorAuthStep1
}