import { api } from "../axios/axios.config";
import { API_res_model, clientRes, UserProfile } from "../../types";

export const ClientQueries = (session: any) => {
    const defaultReqConfig = {
        headers: {
            Authorization: session.data?.user.token ?? ""
        }
    }

    const createClient = async (data: any & {mobile: string}): Promise<API_res_model & {client: clientRes}> => {
        return (await api.post(`/client/create`, data, defaultReqConfig)).data;
    }

    return {
        createClient,
    }
}