export type userType_ = "organization" | "individual";

export interface PageAuth {
    requireAuth: {
        auth: boolean
        userType: userType_
        multipleUserTypes?: {
            status: boolean
            supported: string[]
        }
    }
}