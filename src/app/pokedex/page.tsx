import {Header} from "@/components/Header/header";
import {PokedexPresentation} from "@/components/pokedexPresentation/pokedexPresentation";
import {Pokedex} from "@/components/pokedex/pokedex";
import { db } from "@/lib/prisma";
import {Suspense} from "react";
import Footer from "@/components/footer/Footer";
import {Generations, Pokemon, Types} from "@/lib/definitions";

export default async function Home({searchParams}: { searchParams: Promise<{ type?: string, generation?: string}>}) {
    const params = await searchParams;
    const whereClause: any = {};

    if (params.type) {
        whereClause.pokemonTypes = {
            some: {
                type: {
                    nomType: params.type
                }
            }
        };
    }
    if (params.generation) {
        whereClause.generations = {
            nomGeneration: params.generation
        };
    }
    const initialPokemon = await db.orm.public.Pokemon.where(whereClause).include("generation").include("types").orderBy([(p) => p.numPokedex.asc()]).limit(50).all();

    const allTypes = await db.orm.public.Types.all();
    const allGeneration = await db.orm.public.Generations.orderBy([(g) => g.numGeneration.asc()]).all();
    return (
        <>
            <Header/>
            <main>
                <PokedexPresentation/>
                <Suspense fallback={<div className="text-center py-20 text-white font-bold">Chargement du Pokédex National...</div>}>
                    <Pokedex initialPokemon={initialPokemon as Pokemon[]} allType={allTypes as Types[]} allGen={allGeneration as Generations[]} currentFilters={params}/>
                </Suspense>
            </main>
            <Footer/>
        </>
    );
}
