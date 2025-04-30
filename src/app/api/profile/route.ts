import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = "testtoken"; // Replace with your actual secret key

export async function GET(request: NextRequest) {
    try {
        // Get the Authorization header
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Extract the token
        const token = authHeader.split(" ")[1];

        // Verify and decode the token
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY) as { id: number };
        } catch (err) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }

        // Extract the user ID from the token
        const userId = decoded.id;

        // Fetch the user from the database
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                // profilePicture: true, // Uncomment if needed
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return the user profile
        console.log("User Profile:", user);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}