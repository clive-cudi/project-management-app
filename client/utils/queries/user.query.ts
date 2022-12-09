import { api } from "../axios/axios.config";
import { API_res_model } from "../../types";

export const UserQueries = (session: any) => {
    const defaultReqConfig = {
        headers: {
            Authorization: session.data?.user.token ?? ""
        }
    }

    const updateProfilePic = async (fileS3URL: string): Promise<API_res_model & {picUrl: string}> => {
        return (await api.post(`/user/update-profile-picture`, {picUrl: fileS3URL}, defaultReqConfig)).data;
    }

    return {
        updateProfilePic
    }
}