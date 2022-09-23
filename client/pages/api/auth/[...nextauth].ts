import NextAuth from "next-auth/next";
import GoogleAuth from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

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

                return {}
            }
        })
    ],
    callbacks: {
        jwt: async ({token}) => {
            return token;
        },
        session: async ({session}) => {
            return session;
        },
    },
    pages: {
        signIn: "/login"
    },
    secret: `${process.env.NEXTAUTH_SECRET} ?? "gycwytgfc9weyfiusdgugew"`
})