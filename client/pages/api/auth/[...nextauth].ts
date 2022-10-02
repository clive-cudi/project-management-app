import NextAuth from "next-auth/next";
import GoogleAuth from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios, { AxiosResponse } from "axios";
import { Api_User_res, API_res_model } from "../../../types";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Credentials({
            id: "credentials_email",
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "username",
                    placeholder: "Enter Username"
                },
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter Email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Password"
                }
            },
            async authorize(credentials, req) {
                console.log(credentials);

                const loginRes: AxiosResponse<API_res_model> = await axios.post<API_res_model>(`${process.env.BACKEND_API_URL}/auth/login`, credentials);

                console.log(loginRes.data);

                if (loginRes.data.success === true) {
                    return {...loginRes.data.usertoken};
                }

                if (loginRes.data.success === false) {
                    console.log(loginRes.data.error.debug);
                    throw new Error(JSON.stringify({...loginRes.data?.error, message: loginRes.data.message}))
                }

                return null;
            }
        })
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            console.log(token);

            if (user) {
                token = {
                    ...token,
                    name: user.user.username,
                    email: user.user.email,
                    usertype: user.user.usertype,
                    uid: user.user.uid
                }
            }


            return token;
        },
        session: async ({session, user}) => {
            return session;
        },
    },
    pages: {
        signIn: "/login"
    },
    secret: `${process.env.NEXTAUTH_SECRET} ?? "gycwytgfc9weyfiusdgugew"`
})