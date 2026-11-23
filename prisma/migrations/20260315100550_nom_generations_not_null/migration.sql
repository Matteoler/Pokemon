/*
  Warnings:

  - Made the column `nomGeneration` on table `generations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "generations" ALTER COLUMN "nomGeneration" SET NOT NULL;
