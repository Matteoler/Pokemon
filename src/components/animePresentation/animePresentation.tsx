import React from 'react';
import Image from "next/image";

export const AnimePresentation = () => {
    return (
        <section className="h-auto lg:h-screen bg-blue justify-between w-screen flex flex-wrap">
            <Image className={"margin-p-1 self-center object-cover h-[99%]"} src={"/assets/images/Anime/arceusAnime.png"} alt={"Arceus"} width={736} height={920} />
            <div className={"self-end pb-6 span-w-5-wide"}>
                <h1 className={"text-white text-38 font-bold uppercase"}>Vivez les aventures de sacha ketchum</h1>
                <p className={"text-white text-2xl mt-10"}>
                    Parcourer les régions et devennez mettre de la ligue avec Sacha et ses amis
                </p>
            </div>
        </section>
    );
};