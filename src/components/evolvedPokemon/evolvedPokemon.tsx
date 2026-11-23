import React from "react";
import Image from "next/image";
import { EvolutionNode } from "@/lib/definitions";

interface EvolutionChainProps {
    chain: EvolutionNode[];
}

const PokemonCard = ({ pokemon }: { pokemon: EvolutionNode }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className={"w-75 p-2 bg-light-gray flex flex-col justify-between h-80 rounded-xl"}>
                <div className={"bg-light-violet rounded-sm"}>
                    <Image src={`/assets/images/Pokemon/${pokemon.image}`} className={"justify-self-center"} width={240} height={240} alt={""}/>
                </div>
                <p className={"text-center font-bold font-Geist text-2xl mb-2"}>{pokemon.nomPokemon}</p>
            </div>

            {pokemon.evolutions && pokemon.evolutions.length > 0 && (
                <div className="flex flex-row flex-wrap justify-center gap-10 mt-4">
                    {pokemon.evolutions.map((evo) => (
                        <PokemonCard key={evo.numPokedex} pokemon={evo} />
                    ))}
                </div>
            )}
        </div>
    );
};

const evolvedPokemon = ({ chain }: EvolutionChainProps) => {

    return (
        <section className="py-10">
            <h2 className="text-center text-3xl font-bold mb-10">Famille du Pokémon</h2>
            <div className="flex justify-center">
                {chain.map((basePokemon) => (
                    <PokemonCard pokemon={basePokemon} key={basePokemon.numPokedex} />
                ))}
            </div>
        </section>
    );
};

export default evolvedPokemon;
