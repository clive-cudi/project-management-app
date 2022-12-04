import create from "zustand/react";
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
            
        },
        addMultiple(projects) {
            
        },
        setLoading(isLoading) {
            
        },
        remove(pid) {
            
        },
    }
})