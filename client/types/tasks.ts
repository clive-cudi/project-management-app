import { TaskCategory } from "./general"

export interface taskRes {
    name: string,
    taskID: string
    description: string
    type: string
    createdAt: string
    assignees: string[]
    info: {
        created: {
            time: string
        },
        expiry: {
            time: string
        }
    }
    parent: {
        project: {
            pid: string
        }
    }
    priority: TaskCategory
}