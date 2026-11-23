import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET() {
    try {
        const latestGen = await db.orm.public.Generations.select("id", "numGeneration").orderBy([(p) => p.numGeneration.desc()]).first();

        if (!latestGen) {
            return NextResponse.json({ error: 'Aucune génération trouvée' }, { status: 404 });
        }

        const lastGenPokemons = await db.orm.public.Pokemon.where({generationId: latestGen.id}).include("types").orderBy([(p) => p.numPokedex.desc()]).all();

        return NextResponse.json(lastGenPokemons);
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        return NextResponse.json({ error: 'Failed to fetch pokemons' }, { status: 500 });
    }
}