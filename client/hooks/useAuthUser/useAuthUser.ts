import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Api_User_res } from "../../types";
import { api } from "../../utils";

export function useAuthUser() {
    const session = useSession();
    const { data: me_data } = useQuery<{data: {usertoken: {user: Api_User_res}}}>(["me"], () => {
        return api.get(`/auth/me`, {
            headers: {
                Authorization: session.data?.user.token ?? ""
            }
        })
    })

    function getAlluserDetails() {
        return {...me_data?.data.usertoken.user};
    }

    function getUserDetail(field: string) {

    }

    return {
        getAlluserDetails,
        getUserDetail
    }
}