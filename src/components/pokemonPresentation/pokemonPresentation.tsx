'use client';

import React, {useRef, useState} from 'react';
import Image from "next/image";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PokemonPresentationProps {
    pokemon: pokemonData;
}

interface pokemonData {
    nomPokemon: string;
    description: string;
    image: string;
}

export const PokemonPresentation = ({pokemon}: PokemonPresentationProps) =>  {
    const [isShiny, setIsShiny] = useState<boolean>(false);
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

            const pokeballAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=1000',
                    scrub: true,
                }
            });
            pokeballAnimation.to(
                '.pokeball',
                {
                    y: -200,
                    rotation: 360,
                    duration: 50,
                    ease: "easeInOutSine",
                    transformOrigin: "center center"
                }
            );
            pokeballAnimation.to(
                '.pokeball1',
                {
                    y: 200,
                    rotation: 360,
                    duration: 50,
                    ease: "linear",
                    transformOrigin: "center center"
                },
                "<"
            );
        }, {scope: sectionRef}
    );

    const imagePath = isShiny ? '/assets/images/Pokemon/Shiny/' + pokemon.image : '/assets/images/Pokemon/' + pokemon.image;
    const pokeball = '/assets/images/Poke_Ball.png';
    return (
        <section ref={sectionRef} className={"relative overflow-hidden"}>
            <Image src={pokeball} alt={""} width={400} height={400} priority className={"absolute pokeball1 hidden xl:block rotate-145 top-50 -right-30"} style={{ width: 400, height: 400, maxWidth: 'none' }}/>
            <Image src={pokeball} alt={""} width={400} height={400} priority className={"absolute pokeball hidden xl:block rotate-45 top-20 -left-45"} style={{ width: 400, height: 400, maxWidth: 'none' }}/>
            <h1 className={"text-center mt-37 text-72 font-bold uppercase "}>Pokemon</h1>
            <div className={"flex flex-wrap justify-center mt-20 gap-32"}>
                <div className={"flex flex-col justify-between items-center"}>
                    <Image src={imagePath} key={imagePath} className={"w-87 h-77 object-contain"} width={350} height={310} alt={""}/>
                    <button onClick={() => setIsShiny(!isShiny)} className={"border-2 w-50 border-blue px-4 py-3 cursor-pointer rounded-md"}>{isShiny ? 'Voir la version normal' : 'Voir le chromatique'}</button>
                </div>
                <div className={"bg-blue text-white p-10 rounded-md flex flex-col gap-6 max-h-150 min-h-100"}>
                    <h2 className={"font-bold text-32 text-center"}>{pokemon.nomPokemon}</h2>
                    <p className={"xl:w-103"}>{pokemon.description}</p>
                </div>
            </div>
        </section>
    );
};