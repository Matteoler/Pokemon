'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface PokemonCardProps {
    name: string;
    image: string;
    types: { nomType: string; image: string }[];
}

export const PokedexCard = ({ name, image, types }: PokemonCardProps) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!itemRef.current) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle('');
    };

    const imagePathPoke = '/assets/images/Pokemon/';
    const imagePathType = '/assets/images/Type/';

    return (
        <div
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
            className="bg-ice-blue py-8 flex items-center justify-center border-2 border-solid border-dark-blue gap-15 span-w-3-wide rounded-md"
        >
            <Image src={`${imagePathPoke}${image}`} width={475} height={475} alt={name} className="w-24 h-24 object-contain mt-4" />
            <div className={"h-40 flex flex-col justify-between"}>
                <h3 className="font-bold text-xl uppercase">{name}</h3>
                <div className="flex mt-4">
                    {types.map((type: { nomType: string; image: string }, index: number) => (
                        <Image
                            width={"128"}
                            height={"128"}
                            key={index}
                            src={`${imagePathType}${type.image}`}
                            alt={`${name} - Type ${type.nomType}`}
                            className="w-9 h-9 mr-2"
                        />
                    ))}
                </div>
                <div className="font-Geist text-14">
                    <p>Limited</p>
                    <p className="font-bold">Edition</p>
                </div>
            </div>
        </div>
    );
};