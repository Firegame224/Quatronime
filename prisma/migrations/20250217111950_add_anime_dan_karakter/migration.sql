/*
  Warnings:

  - The primary key for the `Anime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `malId` on the `Anime` table. All the data in the column will be lost.
  - The `episodes` column on the `Anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Character` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `malId` on the `Character` table. All the data in the column will be lost.
  - Added the required column `mal_id` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mal_id` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_animeId_fkey";

-- DropIndex
DROP INDEX "Anime_malId_key";

-- DropIndex
DROP INDEX "Character_malId_key";

-- AlterTable
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "malId",
ADD COLUMN     "aired" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "mal_id" INTEGER NOT NULL,
ADD COLUMN     "ranking" INTEGER,
ADD COLUMN     "score" DOUBLE PRECISION,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "type" TEXT,
ADD COLUMN     "year" INTEGER,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "genres" DROP NOT NULL,
DROP COLUMN "episodes",
ADD COLUMN     "episodes" INTEGER,
ADD CONSTRAINT "Anime_pkey" PRIMARY KEY ("mal_id");

-- AlterTable
ALTER TABLE "Character" DROP CONSTRAINT "Character_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "malId",
ADD COLUMN     "mal_id" INTEGER NOT NULL,
ADD COLUMN     "role" TEXT,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ADD CONSTRAINT "Character_pkey" PRIMARY KEY ("mal_id");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("mal_id") ON DELETE RESTRICT ON UPDATE CASCADE;
