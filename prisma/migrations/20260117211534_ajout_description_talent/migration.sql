/*
  Warnings:

  - You are about to drop the column `effet` on the `talents` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nomTalent]` on the table `talents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nomType]` on the table `types` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `talents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemonTalents" ADD COLUMN     "estCache" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "talents" DROP COLUMN "effet",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "effetCombat" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "talents_nomTalent_key" ON "talents"("nomTalent");

-- CreateIndex
CREATE UNIQUE INDEX "types_nomType_key" ON "types"("nomType");
