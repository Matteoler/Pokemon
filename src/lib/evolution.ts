"use server";

import { db } from '@/lib/prisma';
import { EvolutionNode } from "@/lib/definitions";

export async function getEvolutionChain(numPokedex: number) : Promise<EvolutionNode[]> {
    try {
        const id = parseInt(String(numPokedex));

        const currentPokemon = await db.orm.public.Pokemon.where({ numPokedex: id }).select("evolutionChainId").first();

        if (!currentPokemon) {
            return [];
        }

        // 2. Critère : Si pas de chainId (ex: Pokémon sans évolution comme Insolourdo), on cherche juste par ID
        const searchCriteria = currentPokemon.evolutionChainId
            ? { evolutionChainId: currentPokemon.evolutionChainId }
            : { numPokedex: id };

        // 3. On récupère TOUTE la famille en une requête
        const allFamily = await db.orm.public.Pokemon.where(searchCriteria).select("numPokedex", "nomPokemon", "image", "evolutionPrecedenteId").orderBy([(p) => p.numPokedex.asc()]).all();

        // 4. Algorithme de reconstruction de l'arbre (plus solide)

        // Étape A : On crée tous les noeuds
        const pokemonMap = new Map<number, EvolutionNode>();
        allFamily.forEach((p) => {
            pokemonMap.set(p.numPokedex, {
                numPokedex: p.numPokedex,
                nomPokemon: p.nomPokemon,
                image: p.image,
                evolutions: [],
            });
        });

        const roots: EvolutionNode[] = [];

        // Étape B : On lie les enfants à leurs parents
        allFamily.forEach((p) => {
            const node = pokemonMap.get(p.numPokedex);

            if (!node) return;

            // Si le Pokémon a un parent connu dans la liste récupérée
            if (p.evolutionPrecedenteId && pokemonMap.has(p.evolutionPrecedenteId)) {
                const parent = pokemonMap.get(p.evolutionPrecedenteId);
                parent?.evolutions.push(node);
            } else {
                // S'il n'a pas de parent (ou parent hors liste), c'est une racine (Base)
                roots.push(node);
            }
        });
        return roots;

    } catch (error) {
        return [];
    }
}