import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, challengeId, completed } = body;

    if (!userId || !challengeId || completed === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const progress = await prisma.challengeProgress.upsert({
      where: {
        userId_challengeId: {
          userId,
          challengeId,
        },
      },
      update: {
        completed,
        updatedAt: new Date(),
      },
      create: {
        userId,
        challengeId,
        completed,
        attempts: 0, // Default value for attempts
        user: { connect: { id: userId } }, // Assuming user relation is required
      },
    });

    return NextResponse.json({ alert: "Progress saved" }, { status: 200 });
  } catch (error) {
    console.error("Error handling material progress:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
