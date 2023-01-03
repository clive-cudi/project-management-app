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
    addifUnique: (project: projectRes) => void
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
        addifUnique(project) {
            // check if the project is available in the projects list
            return set((state) => {
                if (state.projects.some((pjct) => pjct.pid === project.pid) === false) {
                    return {projects: [...state.projects, project]};
                } else {
                    return {projects: [...state.projects]};
                }
            })
        },
    }
})