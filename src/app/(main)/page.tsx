import {Header} from "@/components/Header/header";
import {Presentation} from "@/components/presentation/presentation";
import {PokemonWorld} from "@/components/pokemonWorld/pokemonWorld";
import {CardPokemon} from "@/components/cardPokemon/cardPokemon";
import {About} from "@/components/about/About";
import TeamBar from "@/components/teamBar/TeamBar";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
      <>
          <Header/>
          <main>
              <Presentation/>
              <PokemonWorld/>
              <CardPokemon/>
              <About/>
              <TeamBar/>
          </main>
          <Footer/>
      </>
  );
}
