import NextAuth from "next-auth/next";
import GoogleAuth from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios, { AxiosResponse } from "axios";
import { Api_User_res, API_res_model } from "../../../types";
import { User } from "next-auth";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleAuth({
            id: "google",
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        }),
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
                // console.log(credentials);

    // Type 'Promise<{ user?: Api_User_res | null | undefined; token?: string | null | undefined; } | null>' is not assignable to type 'Awaitable<User | null>'.
    // Type 'Promise<{ user?: Api_User_res | null | undefined; token?: string | null | undefined; } | null>' is missing the following properties from type 'User': user, token, twoFA, name, and 2 more.

                console.log("AUTH");

                console.log(process.env.BACKEND_API_URL);

                const loginRes: AxiosResponse<API_res_model> = await axios.post<API_res_model>(`${process.env.BACKEND_API_URL}/auth/login`, credentials);

                console.log(loginRes.data);

                if (loginRes.data.success === true) {
                    const returnData: User = {
                        user: loginRes.data.usertoken?.user as Api_User_res,
                        token: loginRes.data.usertoken?.token ?? "",
                        twoFA: loginRes.data.usertoken?.user?.twoFA.status ?? false,
                        name: loginRes.data.usertoken?.user?.username ?? "",
                        uid: loginRes.data.usertoken?.user?.uid ?? "",
                        id: this.id ?? ""
                    }
                    return {...returnData};
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
        jwt: async ({token, user, account}) => {
            // console.log('Token\n')
            // console.log(token);
            // console.log(user);

            if (account?.provider === "google") {
                const {access_token, id_token} = account;
                console.log(access_token);

                console.log(user);
                
                const googleRes: AxiosResponse<API_res_model> = await axios.post<API_res_model>(`${process.env.BACKEND_API_URL}/auth/google`, {access_token, id_token});

                if (googleRes.data.success === true) {
                    user = {
                        id: googleRes.data.usertoken?.user?.uid ?? "",
                        uid: googleRes.data.usertoken?.user?.uid ?? "",
                        name: googleRes.data.usertoken?.user?.username ?? "",
                        token: googleRes.data.usertoken?.token ?? "",
                        email: googleRes.data.usertoken?.user?.email ?? "",
                        twoFA: googleRes.data.usertoken?.user?.twoFA.status ?? false,
                        user: {
                            ...googleRes.data.usertoken?.user as Api_User_res
                        }
                    };
                }

                // user = {...user, user: {...googleRes.data.usertoken?.user}};

                console.log(googleRes);

                console.log(account)
            }

            if (user) {
                token = {
                    ...token,
                    name: user.user.username,
                    email: user.user.email,
                    usertype: user.user.usertype,
                    uid: user.user.uid,
                    token: user.token,
                    twoFA: user.user.twoFA.status
                }
            }


            return token;
        },
        session: async ({session, user, token}) => {
            // console.log("User");
            // console.log(token);

            Object.keys(token).forEach((parentKey) => {
                session.user[parentKey] = token[parentKey];
            })

            return session;
        },
    },
    pages: {
        signIn: "/login"
    },
    secret: `${process.env.NEXTAUTH_SECRET} ?? "gycwytgfc9weyfiusdgugew"`
})