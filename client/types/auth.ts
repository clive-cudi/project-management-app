export interface PageAuth {
    requireAuth: {
        auth: boolean
        userType: "organization" | "individual"
        multipleUserTypes?: {
        status: boolean
        supported: string[]
        }
    }
}