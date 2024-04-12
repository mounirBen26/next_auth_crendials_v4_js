import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  const body = await request.json()
  console.log(body)
  

  //check if email exists in the db
  const email = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })
  if(email) {
    return NextResponse.json({error: "Email already exists"}) 
  }
  //if not new user create new one
  const hashedPassword = await bcrypt.hash(body.password, 10)
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    }
  })
  return NextResponse.json(user)
}
