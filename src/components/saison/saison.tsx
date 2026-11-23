'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../animatedTitle/animatedTitle';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export const Saison = () => {
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(
                textRef.current.children,
                { opacity: 0, y: -50 },
                {
                    opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', stagger: 0.1,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        }
    }, []);

    const text = "片仮名 カタカナ";

    return (
        <section className="flex items-center flex-wrap">
            <div className="flex-1">
                <div className="margin-p-1 span-w-5 max-sm:span-w-4">
                    <AnimatedTitle
                        title={"Pokemon Ligue Indigo"}
                        containerClass={"font-Geist font-extrabold text-58 max-md:text-38 max-sm:text-28"}
                    />
                    <p className={"text-2xl mt-24 max-md:text-16"}>
                        Sacha vient de fêter son dixième anniversaire et il est prêt à suivre la voie de nombreux autres
                        enfants de son âge dans la région de Kanto : devenir un Dresseur Pokémont ! Mais les choses ne
                        se passent pas vraiment comme prévu lorsqu&#39;il reçoit un Pikachu au lieu d&#39;un Pokémon normal. Il
                        ne tardera pas non plus à découvrir que les Badges d&#39;Arène sont plus difficiles à obtenir qu&#39;il
                        ne le pensait. Heureusement, il est accompagné par deux anciens Champions, Pierre et Ondine,
                        ainsi qu&#39;une foule de nouveaux amis Pokémon (notamment Bulbizarre, Carapuce et Salamèche).
                    </p>
                </div>
            </div>
            <div className="flex-shrink-0 span-w-6-wide max-md:w-screen relative">
                <div ref={textRef} className={"font-extrabold text-58 absolute max-lg:text-22 max-md:hidden top-1/2 transform -translate-y-1/2 -translate-x-1/2 left-2 leading-normal"}>
                    {text.split('').map((char, index) => (
                        <span key={index} className={"block"}>{char}</span>
                    ))}
                </div>
                <Image className={"object-cover w-full"} src={"/assets/images/Anime/saison1.png"} width={716} height={780} alt={"Saison 1"}/>
            </div>
        </section>
    );
};