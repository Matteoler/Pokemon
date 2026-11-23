/*
  Warnings:

  - Made the column `taille` on table `pokemon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `poids` on table `pokemon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pokemon" ADD COLUMN     "categorie" TEXT,
ALTER COLUMN "taille" SET NOT NULL,
ALTER COLUMN "poids" SET NOT NULL;
