import React from 'react';
import PillsComponent from "@/components/pillsComponent/pillsComponent";

interface Talent {
    id: string;
    nomTalent: string;
    description?: string;
}

interface Type {
    id: string;
    nomType: string;
    image: string;
}

interface Pokemon {
    numPokedex: number;
    nomPokemon: string;
    couleur: string;
    taille: number;
    poids: number;
    categorie: string;
    types: Type[];
    talents: Talent[];
}

interface Props {
    pokemon: Pokemon;
}

const PokeInfo = ({ pokemon }: Props) => {
    return (
        <section className={"flex gap-10 flex-wrap justify-center mt-30"}>
            <PillsComponent title={"Catégorie"} pokemonInfo={pokemon.categorie}/>
            <PillsComponent title={"Types"} pokemonInfo={pokemon.types.map(t =>   t.nomType).join(' / ')}/>
            <PillsComponent title={"Couleur"} pokemonInfo={pokemon.couleur}/>
            <PillsComponent title={"Taille"} pokemonInfo={pokemon.taille + ' m'}/>
            <PillsComponent title={"Poids"} pokemonInfo={pokemon.poids + ' kg'}/>
            <PillsComponent title={"Talents"} pokemonInfo={pokemon.talents.map(t => t.nomTalent).join(' / ')}/>
        </section>
    );
};

export default PokeInfo;
