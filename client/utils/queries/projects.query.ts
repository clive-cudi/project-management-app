import { api } from "../axios/axios.config";
import { API_res_model, projectRes } from "../../types";

export const ProjectQueries = (session: any) => {
    const defaultReqConfig = {
        headers: {
            Authorization: session.data?.user.token ?? ""
        }
    };

    const fetchAllProjects = async (): Promise<API_res_model & {projects: projectRes[]}> => {
        return (await api.get("/project/projects-details", defaultReqConfig)).data;
    }

    interface createProjectRequest_Props {
        name: string;
        stage: string;
        clients: string[];
        budget: string;
        start: string;
        finish: string;
        description: string;
      }

    const createProject = async ({ name, stage, clients, budget, start, finish, description }: createProjectRequest_Props): Promise<API_res_model & {project: projectRes}> => {
        return (await api.post("/project/create", { name, stage, clients, budget, start, finish, description }, defaultReqConfig)).data;
    }

    return {
        fetchAllProjects,
        createProject
    }
}