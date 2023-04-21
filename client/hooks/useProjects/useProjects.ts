import { projectRes } from "../../types";
import { useProjectStore } from "../store"

export function useProjects() {
    const { projects } = useProjectStore();

    
    function getProjectById(id: string): projectRes | null {
        return projects.find((target_project) => target_project.pid === id) ?? null;
    }

    function getProjectByIdWithTeamBase(pid: string, tid: string): projectRes | null {
        return projects.find((target_prjct) => target_prjct.pid == pid && target_prjct.contributors.teams.includes(tid)) ?? null;
    }

    return {
        getProjectById,
        getProjectByIdWithTeamBase
    }
}