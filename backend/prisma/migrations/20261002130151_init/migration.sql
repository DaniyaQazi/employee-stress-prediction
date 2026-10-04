-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('EMPLOYEE', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'EMPLOYEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StressPrediction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "openness" DOUBLE PRECISION NOT NULL,
    "conscientiousness" DOUBLE PRECISION NOT NULL,
    "extraversion" DOUBLE PRECISION NOT NULL,
    "agreeableness" DOUBLE PRECISION NOT NULL,
    "neuroticism" DOUBLE PRECISION NOT NULL,
    "sleepTime" DOUBLE PRECISION NOT NULL,
    "wakeTime" DOUBLE PRECISION NOT NULL,
    "sleepDuration" DOUBLE PRECISION NOT NULL,
    "psqiScore" DOUBLE PRECISION NOT NULL,
    "pssScore" DOUBLE PRECISION NOT NULL,
    "callDuration" DOUBLE PRECISION NOT NULL,
    "numCalls" INTEGER NOT NULL,
    "numSms" INTEGER NOT NULL,
    "screenOnTime" DOUBLE PRECISION NOT NULL,
    "skinConductance" DOUBLE PRECISION NOT NULL,
    "accelerometer" DOUBLE PRECISION NOT NULL,
    "mobilityRadius" DOUBLE PRECISION NOT NULL,
    "mobilityDistance" DOUBLE PRECISION NOT NULL,
    "predictedStressScore" DOUBLE PRECISION NOT NULL,
    "predictedStressLevel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StressPrediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "StressPrediction_userId_idx" ON "StressPrediction"("userId");

-- CreateIndex
CREATE INDEX "StressPrediction_createdAt_idx" ON "StressPrediction"("createdAt");

-- AddForeignKey
ALTER TABLE "StressPrediction" ADD CONSTRAINT "StressPrediction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
