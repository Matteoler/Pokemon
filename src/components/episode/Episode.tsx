import React from 'react';

type EpisodeProps = {
    videoUrl: string;
    description: string;
};

export const Episode = ({ videoUrl, description }: EpisodeProps) => {
    return (
        <section className={"grid-container"}>
            <div className={"flex max-lg:flex-wrap lg:mt-32 md:mt-18 sm:mt-12 gap-4"}>
                <iframe width="1280" height="720" src={videoUrl} className={"lg:span-w-7 max-lg:w-full lg:h-130 aspect-video max-lg:h-auto"}
                        title="Pokémon Episode"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
                <p className={"flex-1 lg:flex justify-center block"}>
                    <span className={"lg:span-w-4"}>
                        {description}
                    </span>
                </p>
            </div>
        </section>
    );
};