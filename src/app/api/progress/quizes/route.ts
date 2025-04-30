import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { userId, quizId, score, completed } = req.body;

      if (!userId || !quizId || score === undefined || completed === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const progress = await prisma.quizProgress.upsert({
        where: {
          userId_quizId: {
            userId,
            quizId,
          },
        },
        update: {
          score,
          completed,
          updatedAt: new Date(),
        },
        create: {
          userId,
          quizId,
          score,
          completed,
        },
      });

      return res.status(200).json({ message: "Quiz progress saved successfully", progress });
    } else if (req.method === "GET") {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: "Missing userId in query" });
      }

      const progress = await prisma.quizProgress.findMany({
        where: { userId: Number(userId) },
      });

      return res.status(200).json({ progress });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error handling quiz progress:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}