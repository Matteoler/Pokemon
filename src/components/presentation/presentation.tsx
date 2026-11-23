'use client';

import React from 'react';
import Image from "next/image";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {SplitText} from "gsap/SplitText";

export const Presentation = () => {
    useGSAP(() => {
        const heroSplit = new SplitText('#titlePresentation', {
            type: 'words, chars',
        });
        const paragraphSplit = new SplitText('.subtitle', {
            type: 'lines',
        });

        gsap.from(heroSplit.chars, {
            duration: 1,
            opacity: 0,
            yPercent: 80,
            ease: 'expo.out',
            stagger: 0.04,
        });

        gsap.from(paragraphSplit.lines, {
            duration: 1.8,
            opacity: 0,
            yPercent: 100,
            ease: 'expo.out',
            stagger: 0.05,
            delay: 1.5,
        });
    });

    return (
        <section className={"bg-light-blue h-screen text-DarkBlue w-full flex items-center justify-center"}>
            <div className="span-w-10  max-sm:span-w-4">
                <h1 id={'titlePresentation'} className="font-Nohemi font-extrabold text-74 span-w-7 max-md:text-22 max-sm:text-18 max-md:w-auto">Bienvenue dans le monde des
                    pokémons</h1>
                <div className={'flex items-center justify-between mt-14 flex-wrap'}>
                    <video src={"/assets/gif/pichu.webm"} width={"500"} height={"231"} className={"h-full span-w-4"} id={'animatedGif'} autoPlay={true} loop={true} muted={true} playsInline={true}/>
                    <div className={"span-w-5"}>
                        <h2 className={"subtitle font-Geist font-bold text-32 text-nowrap"}>Pocket Monster</h2>
                        <p className={"mt-4 subtitle"}>Plonger vous dans le monde des Pokémons et prenez le temps de découvrir
                            ce monde remplis de mystère</p>
                        <button className={"mt-14 subtitle"}>Découvrir plus</button>
                    </div>
                </div>
            </div>
        </section>
    );
};