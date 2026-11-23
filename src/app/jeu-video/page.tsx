import React from 'react';
import JeuPresentation from "@/components/jeuPresentation/jeuPresentation";
import {Header} from "@/components/Header/header";
import Footer from "@/components/footer/Footer";

function JeuxVideo() {
    return (
        <>
            <Header/>
            <main>
                <JeuPresentation/>
            </main>
            <Footer/>
        </>

    );
}

export default JeuxVideo;