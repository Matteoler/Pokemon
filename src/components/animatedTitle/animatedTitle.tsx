'use client';

import { gsap } from "gsap";
import { Key, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimatedTitleProps = {
    title: string;
    containerClass: string;
};

const AnimatedTitle = ({ title, containerClass }: AnimatedTitleProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "100 bottom",
                    end: "center bottom",
                    toggleActions: "play none none reverse",
                },
            });

            titleAnimation.to(
                ".animated-word",
                {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
                    ease: "power2.inOut",
                    stagger: 0.02,
                },
                0
            );
        }, containerRef);

        return () => ctx.revert(); // Clean up on unmount
    }, []);

    return (
        <div ref={containerRef} className={`${containerClass} flex gap-2.5`}>
            {title.split(" ").map((line: string, index: Key | null | undefined) => (
                <span
                    key={index}
                    className="animated-word"
                >
          {line}
        </span>
            ))}
        </div>
    );
};

export default AnimatedTitle;
