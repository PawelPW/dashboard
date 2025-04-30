/*
  Warnings:

  - A unique constraint covering the columns `[userId,challengeId]` on the table `ChallengeProgress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,materialId]` on the table `MaterialProgress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,quizId]` on the table `QuizProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChallengeProgress_userId_challengeId_key" ON "ChallengeProgress"("userId", "challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialProgress_userId_materialId_key" ON "MaterialProgress"("userId", "materialId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizProgress_userId_quizId_key" ON "QuizProgress"("userId", "quizId");
