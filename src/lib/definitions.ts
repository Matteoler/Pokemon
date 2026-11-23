// Importez le namespace Models depuis votre fichier de contrat généré
import type { Models } from '../../generated/prisma8/contract'; // Ajustez le chemin selon votre structure

export type Pokemon = Models.public_Pokemon;
export type Types = Models.public_Types;
export type Generations = Models.public_Generations;

export interface EvolutionNode extends Pick<Pokemon, 'numPokedex' | 'nomPokemon' | 'image'> {
    evolutions: EvolutionNode[];
}

export type PokemonWithDetails = Pokemon & {
    generation?: Pick<Generations, 'nomGeneration'>;
    types?: Types[];
};