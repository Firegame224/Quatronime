/*
  Warnings:

  - You are about to drop the column `endDate` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Anime` table. All the data in the column will be lost.
  - Made the column `imageUrl` on table `Anime` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "favorites" TEXT,
ADD COLUMN     "members" TEXT,
ADD COLUMN     "popularity" TEXT,
ALTER COLUMN "imageUrl" SET NOT NULL;
