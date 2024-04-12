import NextAuth from "next-auth/next";
import {CredentialsProvider} from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "username", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials) {
               
                
        }
    })
    ],
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",

})
