import { api } from "../axios/axios.config";
import { API_res_model, clientRes } from "../../types";

export const UserQueries = (session: any) => {
    const defaultReqConfig = {
        headers: {
            Authorization: session.data?.user.token ?? ""
        }
    }

    const updateProfilePic = async (fileS3URL: string): Promise<API_res_model & {picUrl: string}> => {
        return (await api.post(`/user/update-profile-picture`, {picUrl: fileS3URL}, defaultReqConfig)).data;
    }

    const getClients = async (): Promise<API_res_model & {clients: clientRes[]}> => {
        return (await api.get(`/user/get-clients`, defaultReqConfig)).data;
    }

    return {
        updateProfilePic,
        getClients
    }
}