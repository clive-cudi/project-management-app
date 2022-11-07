function generateResponse({req, res, type, data, status, error}) {
    // res = "error", "success"
    console.log("GR invoked ...");
    const { usertoken } = req.body;

    switch (type) {
        case "success":
            return res.status(status ?? 200).json({
                success: true,
                message: "Success",
                usertoken: {
                    user: usertoken,
                    token: usertoken.token
                },
                error: {
                    status: false,
                    code: null
                },
                ...data
            });
        case "error":
            return res.status(status ?? 400).json({
                success: false,
                message: "Error",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "error"
                },
                ...data
            });
        case "not_found_db":
            return res.status(status ?? 404).json({
                success: false,
                message: "Not found in DB",
                usertoken: {
                    user: null,
                    token: null,
                },
                error: {
                    status: true,
                    code: "not_found_db",
                },
                ...data
            });
        case "db_error":
            return res.status(status ?? 400).json({
                success: false,
                message: "DB Error",
                usertoken: {
                    user: null,
                    token: null
                },
                error: {
                    status: true,
                    code: "db_error",
                    debug: error ?? null
                },
                ...data
            });
        case "custom":
            return res.status(status ?? 200).json({...data});
        default:
            return res.status(status ?? 200).json({...data});
    }
}

async function findUserDB(userModel) {
    // userModel.findOne()
}

function objMutationDemo({data}) {
    return {
        success: true,
        word: {
            letters: 20,
            language: 'en'
        },
        wrap: false,
        ...data
    }
}

// console.log(objMutationDemo({data: {added: {msg: "Works"}, success: false}}))

module.exports = {
    generateResponse
}