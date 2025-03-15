/*
  Warnings:

  - The `favorites` column on the `Anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `members` column on the `Anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `popularity` column on the `Anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "favorites",
ADD COLUMN     "favorites" INTEGER,
DROP COLUMN "members",
ADD COLUMN     "members" INTEGER,
DROP COLUMN "popularity",
ADD COLUMN     "popularity" INTEGER;
