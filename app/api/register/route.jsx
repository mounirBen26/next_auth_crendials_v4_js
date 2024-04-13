import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  const body = await request.json()
  const { name,email, password } = body.data
  console.log(name,email, password)
  

  //check if email exists in the db
  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  if(userExist) {
    return NextResponse.json({error: "Email already exists"}) 
  }
  //if not new user create new one
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      hashedPassword: hashedPassword,
    }
  })
  return NextResponse.json(user)
}
