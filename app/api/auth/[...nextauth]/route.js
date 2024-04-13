import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "username", type: "text"},
                password: {label: "password", type: "password"},
                email:{label: "email", type: "email"},
            },
            async authorize(credentials) {
               //check if user exists
                const userExists = await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                })
                if(!userExists){
                    return null
                }
                const checkPassword = await bcrypt.compare(credentials.password, userExists.hashedPassword)
                if(!checkPassword){
                    return null
                }
                return userExists
    }})
    ],
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",

}

export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
