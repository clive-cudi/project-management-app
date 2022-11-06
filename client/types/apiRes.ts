export interface Api_User_res {
    username: string
    email: string
    uid: string
    profilePicUrl?: string
    about?: string
    isVerified: boolean
    usertype: "individual" | "organization"
    teams: string[]
    orgs: string[]
    info?: {
        address?: {
            country?: string
            location?: string
            street?: string
        }
        skills?: string[]
        gender?: string
        timezones: {
            default: string
            other?: string[]
        }
        phone?: string
        language?: string
    }
    twoFA: {
        status: boolean
    }
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