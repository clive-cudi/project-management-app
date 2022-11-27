const org_auth = (req, res, next) => {
    const { usertoken } = req.body;

    if (usertoken.usertype === "organization") {
        return next();
    } else {
        const { token, ...user } = usertoken;
        return res.status(401).json({
            message: "Organization Specific route",
            usertoken: {
                user: user,
                token: token
            },
            error: {
                status: true,
                code: "unauthorized_organization_route"
            }
        })
    }
}

module.exports = org_auth;