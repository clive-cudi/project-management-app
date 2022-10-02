export interface Api_User_res {
    username: string
    email: string
    uid: string
    isVerified: boolean
    usertype: "individual" | "organization"
    teams: []
    orgs: []
    about?: string
}

export interface API_res_model {
    success: boolean
    message: string
    usertoken: {
        user: Api_User_res | null
        token: string | null
    } | null
    error: {
        status: boolean
        code: string | null
        debug?: any
    }
}