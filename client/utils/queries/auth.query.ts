import { SessionContextValue } from "next-auth/react";
import { API_res_model } from "../../types";
import { api } from "../axios/axios.config";

export const AuthQueries = (session: SessionContextValue) => {
    const defaultReqConfig = {
        headers: {
            Authorization: session.data?.user.token ?? ""
        }
    };

    const getMe = async (): Promise<API_res_model> => {
        return (await api.get("/auth/me", defaultReqConfig)).data;
    }

    return {
        getMe
    }
}