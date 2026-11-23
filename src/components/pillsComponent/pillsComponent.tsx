import React from 'react';

interface Props {
    title: string;
    pokemonInfo: string;
}

const PillsComponent = ({title, pokemonInfo}: Props) => {
    return(
        <div className={"text-center w-35"}>
            <h3 className={"border-dark-blue rounded-2xl py-2 border-2"}>{title}</h3>
            <p className={"mt-4"}>{pokemonInfo}</p>
        </div>
    );
};

export default PillsComponent;