import React from "react";

function JeuPresentation() {
    return (
        <section>
            <video className={"h-auto lg:h-screen w-screen object-cover"} loop={true} autoPlay={true} muted={true} src={"/assets/video/jeux.mp4"} width={3840} height={2160} />
        </section>
    );
}

export default JeuPresentation;
