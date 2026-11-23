'use client';

import React, {useRef} from 'react';
import { gsap} from "gsap";
import {useGSAP} from "@gsap/react";

function StatBar({statValue , statName}: {statValue: number, statName: string}) {
    const pourcentageStat = (statValue / 200) * 100;

    const minPourcentageStat = Math.min(pourcentageStat, 100);

    const couleurBar = statValue < 50 ? "bg-red-800" : statValue <105 ? "bg-yellow-700" : statValue <200 ? "bg-green-800" : "bg-blue-800";

    const barRef = useRef(null);

    useGSAP(
        () => {
            gsap.to(barRef.current, {
                duration: 2,
                width: `${minPourcentageStat}%`,
                ease: "bounce",
            });
        },
    );
    return (
        <div className={"flex gap-2 items-center w-100 "}>
            <div className={"flex gap-2 w-30 justify-end"}>
                <p>{statName}</p>
                <p className={"w-10 text-right"}>{statValue}</p>
            </div>
            <div className="w-60">
                <div ref={barRef} className={`rounded-md h-4 w-0 ${couleurBar}`}></div>
            </div>
        </div>
    );
}

export default StatBar;