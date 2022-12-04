export interface projectRes {
    pid: string,
    name: string,
    stage: string,
    tasks: string[],
    info: {
        created: {
            time: string
        },
        expiry: {
            time: string
        },
        parent: {
            uid: string
        },
        description: string,
        clients: string[]
    },
    contributors: {
        teams: string[]
        individuals: string[]
    }
}