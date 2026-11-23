'use client';

import React, { useRef } from "react";
import AnimatedTitle from "@/components/animatedTitle/animatedTitle";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const PokemonWorld: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: true,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
            }
        },);

        gsap.set('.clip-path1', {
            left: "50%",
            xPercent: -50
        });

        clipAnimation.to('.clip-path1', {
            width: "100vw",
            height: "100vh",
            left: "0%",
            xPercent: 0,
            "--clip": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });

        gsap.fromTo(".text-appear",{
            opacity: 0,
        }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '#clip',
                start: 'top top',
                end: '+=800',
                scrub: true,
            }
        },);
    });

    return (
        <section ref={sectionRef} className="mt-14 relative">
            <AnimatedTitle
                title="Découvrer un monde fascinant"
                containerClass="ml-20 uppercase text-40 font-bold font-Geist flex-wrap max-md:normal-case max-md:text-22"
            />

            <div className={"h-dvh w-screen mt-14"} id={"clip"}>
                <div className={"clip-path1 absolute top-0 z-20 h-[60vh] w-96 origin-center overflow-hidden md:span-w-6"}>
                    <Image src="/assets/images/Carousel3.webp" loading={"lazy"} fill sizes={"100vw"} alt="" className="absolute left-0 top-0 size-full object-cover"/>
                </div>
                <p className="text-appear text-shadow-custom uppercase z-1000 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-Geist font-bold text-26 span-w-4-wider text-white">
                    Un monde rempli de créatures extraordinaires s’étend devant vous
                </p>
                <p className={"absolute bottom-40 left-1/3 text-center font-Geist font-bold text-26 span-w-4-wider"}>Plonger dans le monde des pokémons et parter à l'aventure</p>
            </div>
            <div className={"relative w-screen h-screen"}>
                <Image
                    src="/assets/images/Carousel1.webp"
                    fill
                    sizes={"100vw"}
                    alt=""
                    className="object-cover"
                    loading={"lazy"}
                />
                <p className="text-shadow-custom uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-Geist font-bold text-26 span-w-4-wider text-white">
                    Certaines partageront votre route, d’autres mettront votre courage à l’épreuve
                </p>
            </div>
            <div className={"relative w-screen h-screen"}>
                <Image
                    src="/assets/images/Carousel2.webp"
                    fill
                    sizes={"100vw"}
                    alt=""
                    className="object-cover"
                    loading={"lazy"}
                />
                <p className="text-shadow-custom uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-Geist font-bold text-26 span-w-4-wider text-white">
                    Mais toutes n’attendent qu’une chose : être découvertes !
                </p>
            </div>
        </section>
    );
};
