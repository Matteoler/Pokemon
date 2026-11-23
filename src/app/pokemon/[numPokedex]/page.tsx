import {Header} from "@/components/Header/header";
import {PokemonPresentation} from "@/components/pokemonPresentation/pokemonPresentation";
import EvolvedPokemon from "@/components/evolvedPokemon/evolvedPokemon";
import PokeInfo from "@/components/pokeInfo/PokeInfo";
import { db } from "@/lib/prisma";
import {getEvolutionChain} from "@/lib/evolution";
import PokemonStats from "@/components/pokemonStats/PokemonStats";
import {Metadata} from "next";
import Footer from "@/components/footer/Footer";

export async function generateMetadata({params}: { params: Promise<{ numPokedex: string }> }): Promise<Metadata> {
    const resolvedParams = await params;

    const numPokedex = Number(resolvedParams.numPokedex);

    const pokemon = await db.orm.public.Pokemon.where({ numPokedex: numPokedex }).first();

    if(!pokemon) {
        return {
            title: "Pokémon introuvable",
        };
    }

    return {
        title: `${pokemon.nomPokemon} - Pokédex`,
        description: `Découvrez les caractéristiques, les évolutions et les talents de ${pokemon.nomPokemon} dans notre Pokédex complet.`,
    };

}

export default async function PokemonPage({params}: { params: Promise<{ numPokedex: string }>}) {
    const resolvedParams = await params;

    const numPokedex = Number(resolvedParams.numPokedex);

    const pokemonData = await db.orm.public.Pokemon.where({ numPokedex: numPokedex }).include("talents").include("generation").include("types").first();

    const evolutionChain = await getEvolutionChain(numPokedex);

    if (!pokemonData) return <div>Pokémon introuvable</div>;

    return (
        <>
            <Header/>
            <main>
                <PokemonPresentation pokemon={pokemonData} />
                <PokeInfo pokemon={pokemonData}/>
                <PokemonStats pokemon={pokemonData} />
                <EvolvedPokemon chain={evolutionChain} />
            </main>
            <Footer/>
        </>
    );
}
