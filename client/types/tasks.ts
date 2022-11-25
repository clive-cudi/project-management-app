import { TaskCategory, Priority_, GeneralTaskStatus_ } from "./general"

export interface taskRes {
    name: string,
    taskID: string
    description: string
    type: string
    createdAt: string
    assignees: string[]
    status: GeneralTaskStatus_
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
    priority: TaskCategory | Priority_
}