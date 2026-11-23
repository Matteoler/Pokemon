'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { Episode } from '@/components/episode/Episode';

const episodes = [
    {
        image: "/assets/images/Anime/episode1.png",
        title: "Episode 1",
        description: "Pokémon - Le départ",
        videoUrl: "https://www.youtube.com/embed/fNq-qi4ld3Y",
        text: "Faites la connaissance de Sacha Ketchum, un jeune garçon de 10ans, dont l'imagination, la confiance en soi et les ambitions sont bien trop grandes pour son petit village de Bourg Palette. Parviendra-t-il à atteindre son rêve de devenir un véritable Maître Pokémon?"
    },
    {
        image: "/assets/images/Anime/episode2.png",
        title: "Episode 2",
        description: "Pokémon aux urgences",
        videoUrl: "https://www.youtube.com/embed/_c_cQZ3gjEg?si=SnBVXbM1yYK0foyl",
        text: "Description for Episode 2"
    },
    {
        image: "/assets/images/Anime/episode3.png",
        title: "Episode 3",
        description: "Capture du premier Pokémon",
        videoUrl: "https://www.youtube.com/embed/_c_cQZ3gjEg?si=SnBVXbM1yYK0foyl",
        text: "Description for Episode 3"
    },
    {
        image: "/assets/images/Anime/episode4.png",
        title: "Episode 4",
        description: "Le défi du samouraï",
        videoUrl: "https://www.youtube.com/embed/_c_cQZ3gjEg?si=SnBVXbM1yYK0foyl",
        text: "Description for Episode 4"
    },
    {
        image: "/assets/images/Anime/episode5.png",
        title: "Episode 5",
        description: "Confrontation à Argenta",
        videoUrl: "https://www.youtube.com/embed/_c_cQZ3gjEg?si=SnBVXbM1yYK0foyl",
        text: "Description for Episode 5"
    }
];

export const EpisodePresentation = () => {
    const [selectedEpisode, setSelectedEpisode] = useState(episodes[0]);

    return (
        <>
            <section className="mt-25 flex max-md:flex-wrap margin-p-1 justify-evenly">
                {episodes.map((episode, index) => (
                    <button key={index} className={"span-w-3 text-Blue/70 hover:text-Blue cursor-pointer"} onClick={() => setSelectedEpisode(episode)}>
                        <Image src={episode.image} alt={episode.title} className={"w-full"} width={288} height={241} />
                        <div className={"flex justify-between mx-2"}>
                            <p>{episode.title}</p>
                            <p>{episode.description}</p>
                        </div>
                    </button>
                ))}
            </section>
            <Episode videoUrl={selectedEpisode.videoUrl} description={selectedEpisode.text} />
        </>
    );
};