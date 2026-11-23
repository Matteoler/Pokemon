'use client';

import React, { useEffect, useState, useRef } from 'react';
import AnimatedTitle from "@/components/animatedTitle/animatedTitle";
import { PokemonCard } from "@/components/pokemonCard/pokemonCard";
import {PokemonWithDetails} from "@/lib/definitions";

export const CardPokemon = () => {
    const [lastGenPokemon, setPokemons] = useState<PokemonWithDetails[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            const response = await fetch('/api/lastGenPokemon');
            const data = await response.json();
            setPokemons(data);
        };
        fetchPokemons().then();
    }, []);

    useEffect(() => {
        if (!scrollRef.current) return;

        const container = scrollRef.current;
        let scrollAmount = 0;
        const speed = 3;
        let rafId: number;

        const step = () => {
            scrollAmount += speed;

            const halfWidth = container.scrollWidth / 2;

            if (scrollAmount >= halfWidth) {
                scrollAmount = 0;
            }

            container.scrollLeft = scrollAmount;
            rafId = requestAnimationFrame(step);
        };

        rafId = requestAnimationFrame(step);

        return () => cancelAnimationFrame(rafId);
    }, [lastGenPokemon]);

    const duplicatedPokemon = [...lastGenPokemon, ...lastGenPokemon];

    return (
        <section className="span-w-10 m-auto max-md:span-w-6-wide max-sm:span-w-4">
            <div>
                <AnimatedTitle
                    title={"Voici les pokémons"}
                    containerClass={"mt-20 text-40 font-bold font-Geist"}
                />
                <div
                    ref={scrollRef}
                    className="overflow-hidden mt-20 py-4"
                    style={{ width: '100%', whiteSpace: 'nowrap' }}
                >
                    <div className="flex gap-8">
                        {duplicatedPokemon.map((pokemon, index) => (
                            <PokemonCard
                                key={index}
                                numPokedex={pokemon.numPokedex}
                                name={pokemon.nomPokemon}
                                image={pokemon.image}
                                types={pokemon.types.map(type => ({ nomType: type.nomType, image: type.image }))}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
