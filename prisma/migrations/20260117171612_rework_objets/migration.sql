/*
  Warnings:

  - You are about to drop the column `effet` on the `objets` table. All the data in the column will be lost.
  - Added the required column `categorieId` to the `objets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `objets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effets` to the `objets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "objets" DROP COLUMN "effet",
ADD COLUMN     "categorieId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "effets" JSONB NOT NULL,
ADD COLUMN     "estReutilisable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "estVendable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "prix" INTEGER;

-- CreateTable
CREATE TABLE "categoriesObjets" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "categoriesObjets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoriesObjets_nom_key" ON "categoriesObjets"("nom");

-- AddForeignKey
ALTER TABLE "objets" ADD CONSTRAINT "objets_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "categoriesObjets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
