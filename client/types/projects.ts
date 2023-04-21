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

// a team should not create/own a project since its generic i.e not specific/ hooked to an actual thing
// a team can only be based off an individual or organization i.e an actual asset/ object