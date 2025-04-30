import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, materialId, completed } = body;

    if (!userId || !materialId || completed === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const progress = await prisma.materialProgress.upsert({
      where: {
        userId_materialId: {
          userId,
          materialId,
        },
      },
      update: {
        completed,
        updatedAt: new Date(),
      },
      create: {
        userId,
        materialId,
        completed,
      },
    });

    return NextResponse.json({ alert: "All good" }, { status: 200 });
  } catch (error) {
    console.error("Error handling material progress:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
