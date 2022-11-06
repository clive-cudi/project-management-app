import axios from "axios";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { Api_User_res } from "../../types";

export function useAuthUser() {
    const session = useSession();
    const { data: me_data } = useQuery<{data: {usertoken: {user: Api_User_res}}}>("me", () => {
        return axios.get(`${process.env.BACKEND_API_URL}/auth/me`, {
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