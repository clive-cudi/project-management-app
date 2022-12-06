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

    return {
        fetchAllProjects
    }
}