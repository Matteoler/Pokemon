"use server";

import { db } from "@/lib/prisma";

export async function loadMorePokemons(offset: number, searchParams: { q?: string, type?: string, generation?: string }) {
    const whereClause: any = {};

    if (searchParams.q) {
        whereClause.nomPokemon = { contains: searchParams.q, mode: 'insensitive' };
    }
    if (searchParams.type) {
        whereClause.pokemonTypes = { some: { type: { nomType: searchParams.type } } };
    }
    if (searchParams.generation) {
        whereClause.generations = { nomGeneration: searchParams.generation };
    }

    return db.orm.public.Pokemon.where(whereClause).include("generation").include("pokemonTypes").orderBy([(p) => p.numPokedex.asc()]).offset(offset).limit(100).all();
}