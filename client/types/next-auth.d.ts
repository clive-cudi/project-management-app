import NextAuth, { DefaultSession }  from "next-auth";
import { JWT } from "next-auth/jwt";
import { Api_User_res } from "./apiRes";

declare module "next-auth" {
    interface Session {
        user: User
    }
    
    interface User {
        user: Api_User_res,
        token: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        address: string
    }
}