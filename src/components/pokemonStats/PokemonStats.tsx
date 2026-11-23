import StatBar from "@/components/statBar/StatBar";

interface Pokemon {
    pv: number;
    attaque: number;
    defense: number;
    attaqueSpe: number;
    defenseSpe: number;
    vitesse: number;
}

interface PokemonProps {
    pokemon: Pokemon;
}

function PokemonStats({pokemon}: PokemonProps) {

    const statsList = [
        { name: "PV", value: pokemon.pv },
        { name: "Attaque", value: pokemon.attaque },
        { name: "Défense", value: pokemon.defense },
        { name: "Atq Spé", value: pokemon.attaqueSpe },
        { name: "Déf Spé", value: pokemon.defenseSpe },
        { name: "Vitesse", value: pokemon.vitesse },
    ];
    return (
    <section className="py-10 w-fit m-auto">
        {statsList.map((stat) => (
            <StatBar key={stat.name} statName={stat.name} statValue={stat.value} />
        ))}
    </section>
    );
}

export default PokemonStats;