import { PrismaClient } from '@prisma/client'

import { error } from "console";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
            select: {
                id: true,
                name: true,
                email: true,
                // profilePicture: true, 
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        console.log(user);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}