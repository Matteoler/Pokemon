/*
  Warnings:

  - You are about to drop the column `teamPokemonPokemonId` on the `Moves` table. All the data in the column will be lost.
  - You are about to drop the column `teamPokemonTeamId` on the `Moves` table. All the data in the column will be lost.
  - You are about to drop the `_TeamTopokemon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TeamTopokemon" DROP CONSTRAINT "_TeamTopokemon_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamTopokemon" DROP CONSTRAINT "_TeamTopokemon_B_fkey";

-- AlterTable
ALTER TABLE "Moves" DROP COLUMN "teamPokemonPokemonId",
DROP COLUMN "teamPokemonTeamId";

-- DropTable
DROP TABLE "_TeamTopokemon";

-- CreateTable
CREATE TABLE "pokemonMoves" (
    "id" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "moveId" TEXT NOT NULL,
    "niveauApprentissage" INTEGER,
    "objetApprentissage" TEXT,

    CONSTRAINT "pokemonMoves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eggGroups" (
    "id" TEXT NOT NULL,
    "nomEggGroup" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "eggGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemonEggGroups" (
    "pokemonId" INTEGER NOT NULL,
    "eggGroupId" TEXT NOT NULL,

    CONSTRAINT "pokemonEggGroups_pkey" PRIMARY KEY ("pokemonId","eggGroupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "eggGroups_nomEggGroup_key" ON "eggGroups"("nomEggGroup");

-- AddForeignKey
ALTER TABLE "pokemonMoves" ADD CONSTRAINT "pokemonMoves_objetApprentissage_fkey" FOREIGN KEY ("objetApprentissage") REFERENCES "objets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonMoves" ADD CONSTRAINT "pokemonMoves_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("numPokedex") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonMoves" ADD CONSTRAINT "pokemonMoves_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Moves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonEggGroups" ADD CONSTRAINT "pokemonEggGroups_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("numPokedex") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonEggGroups" ADD CONSTRAINT "pokemonEggGroups_eggGroupId_fkey" FOREIGN KEY ("eggGroupId") REFERENCES "eggGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
