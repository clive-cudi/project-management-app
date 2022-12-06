import create from "zustand";
import { projectRes } from "../../types";

interface ProjectStoreType {
    projects: projectRes[]
    projectIds: string[],
    isLoading: boolean,
    add: (project: projectRes) => void
    addMultiple: (projects: projectRes[]) => void
    setLoading: (isLoading: boolean) => void
    remove: (pid: string) => void
}

export const useProjectStore = create<ProjectStoreType>()((set) => {
    return {
        projects: [],
        projectIds: [],
        isLoading: false,
        add(project) {
            return set((state) => {
                return {projects: [...state.projects, project]}
            })
        },
        addMultiple(projects) {
            return set((state) => ({projects: projects}))
        },
        setLoading(isLoading) {
            return set((state) => ({isLoading: isLoading}))
        },
        remove(pid) {
            return set((state) => ({projects: [...state.projects].filter((pjct) => pjct.pid !== pid)}))
        },
    }
})