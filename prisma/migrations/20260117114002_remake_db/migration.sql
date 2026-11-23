-- CreateTable
CREATE TABLE "generations" (
    "id" TEXT NOT NULL,
    "numGeneration" INTEGER NOT NULL,
    "nomGeneration" TEXT,
    "description" TEXT NOT NULL,
    "jeuxvideosId" TEXT,

    CONSTRAINT "generations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jeuxvideos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "jeuxvideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lieux" (
    "id" TEXT NOT NULL,
    "nomLieu" TEXT NOT NULL,

    CONSTRAINT "lieux_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objets" (
    "id" TEXT NOT NULL,
    "nomObjet" TEXT NOT NULL,
    "effet" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "objets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon" (
    "numPokedex" SERIAL NOT NULL,
    "nomPokemon" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "couleur" TEXT NOT NULL,
    "taille" DOUBLE PRECISION,
    "poids" DOUBLE PRECISION,
    "generationId" TEXT NOT NULL,
    "evolutionChainId" INTEGER,
    "evolutionPrecedenteId" INTEGER,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("numPokedex")
);

-- CreateTable
CREATE TABLE "types" (
    "id" TEXT NOT NULL,
    "nomType" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemonTypes" (
    "pokemonId" INTEGER NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "pokemonTypes_pkey" PRIMARY KEY ("pokemonId","typeId")
);

-- CreateTable
CREATE TABLE "talents" (
    "id" TEXT NOT NULL,
    "nomTalent" TEXT NOT NULL,
    "effet" TEXT NOT NULL,

    CONSTRAINT "talents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemonTalents" (
    "pokemonId" INTEGER NOT NULL,
    "talentId" TEXT NOT NULL,

    CONSTRAINT "pokemonTalents_pkey" PRIMARY KEY ("pokemonId","talentId")
);

-- CreateTable
CREATE TABLE "saisons" (
    "id" TEXT NOT NULL,
    "nomSaison" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "personnages" TEXT NOT NULL,
    "generationId" TEXT,

    CONSTRAINT "saisons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "generations" ADD CONSTRAINT "generations_jeuxvideosId_fkey" FOREIGN KEY ("jeuxvideosId") REFERENCES "jeuxvideos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "generations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_evolutionPrecedenteId_fkey" FOREIGN KEY ("evolutionPrecedenteId") REFERENCES "pokemon"("numPokedex") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonTypes" ADD CONSTRAINT "pokemonTypes_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("numPokedex") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonTypes" ADD CONSTRAINT "pokemonTypes_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonTalents" ADD CONSTRAINT "pokemonTalents_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("numPokedex") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonTalents" ADD CONSTRAINT "pokemonTalents_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "talents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisons" ADD CONSTRAINT "saisons_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "generations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
