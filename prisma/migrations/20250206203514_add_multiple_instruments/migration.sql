/*
  Warnings:

  - You are about to drop the column `instrument` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "instrument",
ADD COLUMN     "instruments" TEXT[],
ALTER COLUMN "email" SET NOT NULL;
