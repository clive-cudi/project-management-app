import NextAuth, { DefaultSession }  from "next-auth";
import { JWT } from "next-auth/jwt";
import { Api_User_res } from "./apiRes";
import { userType_ } from "./auth";

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
        name?: string,
        email?: string,
        usertype?: userType_,
        uid?: string,
        token?: string
    }
}