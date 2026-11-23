import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const type = searchParams.get('type');
    const generation = searchParams.get('generation');

    const whereClause: any = {};

    if (type) {
        whereClause.pokemonTypes = {
            some: {
                type: {
                    nomType: type
                }
            }
        };
    }

    if (generation) {
        whereClause.generations = {
            nomGeneration: generation
        };
    }

    try {
        const remainingPokemon = await db.orm.public.Pokemon.where(whereClause).include("generation").include("types").orderBy([(p) => p.numPokedex.asc()]).offset(skip).all();

        return NextResponse.json(remainingPokemon);

    } catch (error) {
        console.error("Erreur API /pokemon :", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des Pokémons" },
            { status: 500 }
        );
    }
}