import React from 'react';
import Image from "next/image";

export const PokedexPresentation = () => {
    return (
        <section className="relative w-screen h-auto lg:h-screen">
            <Image className={"object-cover"} loading={"eager"} src={"/assets/images/pokedex.webp"} alt={""} fill />
            <div className={"span-w-5-wide absolute bottom-8 right-0 flex bg-ice-blue p-2 gap-3 corner-cut-tl"}>
                <Image src={"/assets/images/gengar.jpg"} alt={""} width={1200} height={1303} className={"span-w-2 corner-cut-tl h-40 object-cover"}/>
                <div className={"flex flex-col w-full justify-between flex-1"}>
                    <h2 className={"font-Geist font-bold text-22"}>Pocket Monster</h2>
                    <p className={"text-16"}>Lorem ipsum </p>
                    <div className="flex justify-between">
                        <a>
                            Data 01
                        </a>
                        <a>
                            Data 02
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};