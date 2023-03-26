import { api } from "../axios/axios.config";
import { API_res_model, teamsRes } from "../../types";
import { SessionContextValue } from "next-auth/react";

export const TeamQueries = (session: SessionContextValue) => {
    const defaultReqConfig = {
        headers: {
            Authorization: session.data?.user.token ?? ""
        }
    };

    const getMemberTeams = async (): Promise<API_res_model & {teams: teamsRes[]}> => {
        return (await api.post("/teams/member-teams", {uid: session.data?.user.uid}, defaultReqConfig)).data;
    }

    return {
        getMemberTeams
    }
}