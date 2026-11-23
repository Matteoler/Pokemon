'use client';

import React, {useEffect} from 'react';
import {PokemonWithDetails} from "@/lib/definitions";
import {useRouter} from "next/navigation";
import {useTeamStore} from "@/hooks/useTeamStore";
import {Button} from "@/components/ui/button";

function Modal({pokemon} : {pokemon: PokemonWithDetails}) {
    const router = useRouter();
    const imagePoke = "/assets/images/Pokemon/";
    const addPokemon = useTeamStore((state) => state.setPokemonInSlot);

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        html.style.overflow = "hidden";
        body.style.overflow = "hidden";

        return () => {
            html.style.overflow = "";
            body.style.overflow = "";
        };
    }, []);

    const handleClose = () => {
        router.back();
    };

    return (
        <section className="fixed top-0 left-0 w-full h-full bg-blue/50 flex items-center justify-center z-50" onClick={() => handleClose()}>
            <div className={"bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4"} onClick={(e) => e.stopPropagation()}>
                <h1>{pokemon.nomPokemon}</h1>
                <img src={imagePoke + pokemon.image} alt={pokemon.nomPokemon} />
                <h2>{pokemon.generation.nomGeneration}</h2>

                <a href={`/pokemon/${pokemon.numPokedex}`} className={"mt-4 px-4 py-2 bg-blue text-white rounded"}>Voir les détails</a>

                <Button onClick={() => {addPokemon({id: pokemon.numPokedex, image: pokemon.image, name: pokemon.nomPokemon}); handleClose();}} children={"Ajouter à l'équipe"} />
            </div>
        </section>
    );
}

export default Modal;