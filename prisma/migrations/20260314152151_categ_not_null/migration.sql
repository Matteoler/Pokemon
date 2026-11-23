/*
  Warnings:

  - Made the column `categorie` on table `pokemon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attaque` on table `pokemon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attaqueSpe` on table `pokemon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `defense` on table `pokemon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `defenseSpe` on table `pokemon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pv` on table `pokemon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vitesse` on table `pokemon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pokemon" ALTER COLUMN "categorie" SET NOT NULL,
ALTER COLUMN "attaque" SET NOT NULL,
ALTER COLUMN "attaqueSpe" SET NOT NULL,
ALTER COLUMN "defense" SET NOT NULL,
ALTER COLUMN "defenseSpe" SET NOT NULL,
ALTER COLUMN "pv" SET NOT NULL,
ALTER COLUMN "vitesse" SET NOT NULL;
