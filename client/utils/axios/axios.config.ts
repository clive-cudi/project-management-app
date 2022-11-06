import axios from "axios";
import { getSession } from "next-auth/react";

const token = getToken().then((token) => token).catch((err)=> ""); 

export const api = axios.create({
    baseURL: `${process.env.BACKEND_API_URL}`,
    headers: {
        Authorization: token as unknown as string
    }
});

async function getToken() {
    return (await getSession())?.user.token ?? "";
}