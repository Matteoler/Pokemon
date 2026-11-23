import { db } from "@/lib/prisma";
import Modal from "@/components/modal/Modal";
import {PokemonWithDetails} from "@/lib/definitions";

export default async function Page({ params }: { params: Promise<{ numPokedex: string }> }) {
    const resolvedParams = await params;

    const pokemonData = await db.orm.public.Pokemon.where({ numPokedex: Number(resolvedParams.numPokedex) }).include("generation").include("types").first();

    if (!pokemonData) return <div>Pokémon introuvable</div>;


    return (
        <main>
            <Modal pokemon={pokemonData as PokemonWithDetails} />
        </main>

        );
}