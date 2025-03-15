/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_animeId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Character";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Anime2" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "synopsis" TEXT,
    "ranking" INTEGER,
    "score" DOUBLE PRECISION,
    "type" TEXT,
    "episodes" INTEGER,
    "aired" TEXT,
    "popularity" INTEGER,
    "members" INTEGER,
    "favorites" INTEGER,
    "status" TEXT,
    "source" TEXT,
    "trailer" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anime2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animegenre" (
    "AnimeId" INTEGER NOT NULL,
    "GenreId" INTEGER NOT NULL,

    CONSTRAINT "Animegenre_pkey" PRIMARY KEY ("AnimeId","GenreId")
);

-- CreateTable
CREATE TABLE "Karakter" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT,
    "name" TEXT,
    "role" TEXT,
    "cover" TEXT,
    "animeId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Karakter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "Animegenre" ADD CONSTRAINT "Animegenre_AnimeId_fkey" FOREIGN KEY ("AnimeId") REFERENCES "Anime2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animegenre" ADD CONSTRAINT "Animegenre_GenreId_fkey" FOREIGN KEY ("GenreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karakter" ADD CONSTRAINT "Karakter_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
