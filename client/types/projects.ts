import { ProjectHealthStatus } from "./general"

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
        clients: string[],
        status: ProjectHealthStatus
    },
    contributors: {
        teams: string[]
        individuals: string[]
    }
}