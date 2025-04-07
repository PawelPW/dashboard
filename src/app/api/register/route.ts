import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try{
        const body = await request.json()
        const {name, email, password } = body;

        if(!name || !email || !password){
            return NextResponse.json({error:"All fields are required"}, {status: 400});
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
          });
          
          if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
          }
          const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
          });
          return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });        }
    catch(error){
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    };
};