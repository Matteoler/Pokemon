import Image from "next/image";

export const About = () => {
    return (
        <div className="flex mt-45">
            <div className={'span-w-6-wide flex flex-col gap-20 items-center py-45 bg-blue'}>
                <Image className={"span-w-4"} src={"/assets/images/CardAbout/Kyogre.png"} alt={"Kyogre"} width={736} height={920} />
                <Image className={"span-w-4"} src={"/assets/images/CardAbout/Groudon.png"} alt={"Groudon"} width={736} height={920} />
                <Image className={"span-w-4"} src={"/assets/images/CardAbout/Hooh.png"} alt={"Ho-Oh"} width={736} height={920} />
            </div>
            <div className={'span-w-5-wide mx-auto'}>
                <div className={"sticky top-25"}>
                    <h2 className={'font-Geist font-semibold text-36'}>Voyager dans le monde des Pokémon</h2>
                    <p className={"mt-16"}>Lorem ipsum dolor sit amet consectetur. Laoreet vel nec etiam dolor sagittis aliquet aliquam
                        faucibus. Massa pellentesque est aenean sit convallis tempus ut cursus egestas. Amet eget
                        pharetra purus lectus. Aenean pharetra varius id morbi ipsum mauris sodales tellus sed. Lectus
                        dignissim nibh suspendisse netus et. Tellus nulla tristique a fames purus cras. Id interdum
                        semper sit eleifend purus nunc est. Sed ornare quam facilisi semper massa. Faucibus nunc
                        tristique proin luctus gravida lectus donec ultrices. Tempus enim id sagittis nisl fermentum
                        elit. Tristique feugiat nulla pretium fermentum quisque. Sapien volutpat sapien diam leo
                        vulputate et sodales non. Tincidunt placerat nunc vitae arcu ipsum enim lacus massa.</p>
                </div>
            </div>
        </div>
    );
};