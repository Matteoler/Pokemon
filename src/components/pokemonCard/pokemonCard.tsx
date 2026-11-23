'use client';

import React, {useRef, useState} from 'react';
import Image from 'next/image';
import Link from "next/link";


interface PokemonCardProps {
    numPokedex: number,
    name: string,
    image: string,
    types: { nomType: string; image: string }[],
}

export const PokemonCard = ({numPokedex, name, image, types}: PokemonCardProps) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!itemRef.current) return;

        const {left, top, width, height} = itemRef.current.getBoundingClientRect();

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
    const twoTypes = types.length === 2;


    return (
        <div
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{transform: transformStyle}}
            className="span-w-3 flex flex-col items-center p-6 border-2 border-solid border-dark-blue rounded-md max-md:span-w-4-wide max-sm:span-w-4 flex-none"
        >
            <h3 className="font-bold text-32 uppercase"><Link href={`/pokemon/${numPokedex}`}
                                                              scroll={false}>{name}</Link></h3>
            <Image src={`${imagePathPoke}${image}`} alt={name}
                   className="w-full h-73 object-contain mt-12 max-md:h-36 max-lg:h-48" width={475} height={475}/>
            <div className="flex w-full justify-between items-center mt-16 max-md:mt-8">
                {twoTypes ? (
                    <>
                        <Image
                            src={`${imagePathType}${types[0].image}`}
                            alt={`Type ${types[0].nomType}`}
                            width={128}
                            height={128}
                            className="w-9 h-9"
                        />
                        <div className="font-Geist text-24">
                            <p>Limited</p>
                            <p className="font-bold">Edition</p>
                        </div>
                        <Image
                            src={`${imagePathType}${types[1].image}`}
                            alt={`Type ${types[1].nomType}`}
                            width={128}
                            height={128}
                            className="w-9 h-9"
                        />
                    </>
                ) : (
                    <>
                        {types.map((type, index) => (
                            <Image
                                key={index}
                                src={`${imagePathType}${type.image}`}
                                alt={`${name} Type ${type.nomType}`}
                                width={128}
                                height={128}
                                className="w-9 h-9"
                            />
                        ))}
                        <div className="font-Geist text-24">
                            <p>Limited</p>
                            <p className="font-bold">Edition</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};