import {Header} from "@/components/Header/header";
import {AnimePresentation} from "@/components/animePresentation/animePresentation";
import {Saison} from "@/components/saison/saison";
import {EpisodePresentation} from "@/components/episodePresentation/episodePresentation";
import Footer from "@/components/footer/Footer";



export default function Home() {
    return (
        <>
            <Header/>
            <main>
                <AnimePresentation/>
                <Saison/>
                <EpisodePresentation/>
            </main>
            <Footer/>
        </>
    );
}
