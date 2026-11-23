-- CreateTable
CREATE TABLE "nature" (
    "id" TEXT NOT NULL,
    "nomNature" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "nature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moves" (
    "id" TEXT NOT NULL,
    "nomMove" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "puissance" INTEGER NOT NULL,
    "precision" INTEGER NOT NULL,
    "pp" INTEGER NOT NULL,
    "teamPokemonTeamId" TEXT,
    "teamPokemonPokemonId" INTEGER,

    CONSTRAINT "Moves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamPokemon" (
    "teamId" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "objetId" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "natureId" TEXT NOT NULL,
    "move1Id" TEXT NOT NULL,
    "move2Id" TEXT,
    "move3Id" TEXT,
    "move4Id" TEXT,
    "pointsPv" INTEGER NOT NULL DEFAULT 0,
    "pointsAttaque" INTEGER NOT NULL DEFAULT 0,
    "pointsDefense" INTEGER NOT NULL DEFAULT 0,
    "pointsAttaqueSpe" INTEGER NOT NULL DEFAULT 0,
    "pointsDefenseSpe" INTEGER NOT NULL DEFAULT 0,
    "pointsVitesse" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeamPokemon_pkey" PRIMARY KEY ("teamId","pokemonId")
);

-- CreateIndex
CREATE UNIQUE INDEX "nature_nomNature_key" ON "nature"("nomNature");

-- AddForeignKey
ALTER TABLE "Moves" ADD CONSTRAINT "Moves_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("numPokedex") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_objetId_fkey" FOREIGN KEY ("objetId") REFERENCES "objets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "talents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_natureId_fkey" FOREIGN KEY ("natureId") REFERENCES "nature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_move1Id_fkey" FOREIGN KEY ("move1Id") REFERENCES "Moves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_move2Id_fkey" FOREIGN KEY ("move2Id") REFERENCES "Moves"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_move3Id_fkey" FOREIGN KEY ("move3Id") REFERENCES "Moves"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_move4Id_fkey" FOREIGN KEY ("move4Id") REFERENCES "Moves"("id") ON DELETE SET NULL ON UPDATE CASCADE;
