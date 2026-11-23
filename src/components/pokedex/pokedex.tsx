'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { PokedexCard } from "@/components/pokedexCard/pokedexCard";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {PokemonWithDetails, Types, Generations} from "@/lib/definitions";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

gsap.registerPlugin(ScrollTrigger);

interface PokedexProps {
    initialPokemon: PokemonWithDetails[];
    allType: Types[];
    allGen: Generations[];
    currentFilters?: { type?: string, generation?: string };
}

export const Pokedex = ({initialPokemon, allType, allGen, currentFilters = {}} : PokedexProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [pokemonList, setPokemonList] = useState<PokemonWithDetails[]>(initialPokemon);
    const [isLoadingRest, setIsLoadingRest] = useState<boolean>(true);
    const [currentGenerationName, setCurrentGenerationName] = useState<string>('');
    const [selectedGeneration, setSelectedGeneration] = useState<string | null>(searchParams.get('generation') || null);
    const [selectedType, setSelectedType] = useState<string | null>(searchParams.get('type') || null);
    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('q') || '');
    const [debounceSearch, setDebounceSearch] = useState<string>(searchParams.get('q') || '');
    const [visibleCount, setVisibleCount] = useState<number>(50);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);
    const pokemonRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setPokemonList(initialPokemon);
        setIsLoadingRest(true);
    }, [initialPokemon]);

    useEffect(() => {
        const fetchRest = async () => {
            try {
                const params = new URLSearchParams();

                if (currentFilters?.type) params.set('type', currentFilters.type);
                if (currentFilters?.generation) params.set('generation', currentFilters.generation);
                params.set('skip', '50');

                const response = await fetch(`/api/pokemon?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch rest of the pokemons');
                }
                const remainingPokemons : PokemonWithDetails[] = await response.json();

                setPokemonList(prevPokemons => {
                    const existingPokemonIds = new Set(prevPokemons.map(p => p.numPokedex));
                    const uniqueRemaining = remainingPokemons.filter(p => !existingPokemonIds.has(p.numPokedex));
                    return [...prevPokemons, ...uniqueRemaining];
                });
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setIsLoadingRest(false);
            }
        };
        const timeoutId = setTimeout(fetchRest, 100);
        return () => clearTimeout(timeoutId);
    }, [currentFilters]);

    const filteredPokemons = useMemo(() => {
        return pokemonList.filter(pokemon => {
                const matchSearch = pokemon.nomPokemon.toLowerCase().includes(debounceSearch.toLowerCase());
                const matchType = !selectedType || pokemon.types.some(pt => pt.nomType === selectedType);
                const matchGen = !selectedGeneration || pokemon.generation.nomGeneration === selectedGeneration;

                return matchSearch && matchType && matchGen;
            }
        );
    }, [pokemonList, debounceSearch, selectedType, selectedGeneration]);

    useEffect(() => {
        setVisibleCount(50);
    }, [debounceSearch, selectedType, selectedGeneration]);

    const visiblePokemons = useMemo(() => {
        return filteredPokemons.slice(0, visibleCount);
    }, [filteredPokemons, visibleCount]);

    useEffect(() => {
        const infObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < filteredPokemons.length) {
                    setVisibleCount(prev => prev + 100);
                }
            },
            {
                root: scrollContainerRef.current,
                rootMargin: '3000px'
            }
        );

        if (loadMoreRef.current) {
            infObserver.observe(loadMoreRef.current);
        }

        return () => infObserver.disconnect();
    }, [visibleCount, filteredPokemons.length]);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target as HTMLDivElement;
                        const index = parseInt(element.dataset.index || '0', 10);
                        const pokemon = visiblePokemons[index];
                        if (pokemon) {
                            setCurrentGenerationName(pokemon.generation.nomGeneration);
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5
            }
        );

        pokemonRefs.current.forEach(ref => {
            if (ref) {
                observer.current?.observe(ref);
            }
        });

        return () => {
            observer.current?.disconnect();
        };
    }, [visiblePokemons]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceSearch(searchTerm);
            const params = new URLSearchParams(searchParams);
            if (searchTerm){
                params.set('q', searchTerm);
            } else {
                params.delete('q');
            }
            if (selectedType){
                params.set('type', selectedType);
            } else {
                params.delete('type');
            }
            if (selectedGeneration){
                params.set('generation', selectedGeneration);
            }
            else {
                params.delete('generation');
            }

            const newUrl = `${pathname}?${params.toString()}`;
            const currentFullUrl = `${pathname}?${searchParams.toString()}`;

            if (newUrl !== currentFullUrl){
                router.replace(newUrl, { scroll: false });
            }
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, pathname, searchParams, router, selectedGeneration, selectedType]);

    useEffect(() => {
        pokemonRefs.current = new Array(visiblePokemons.length).fill(null);
    }, [visiblePokemons]);

    const setPokemonRef = useCallback((index: number, node: HTMLDivElement | null) => {
        pokemonRefs.current[index] = node;
    }, []);

    useGSAP(() => {
        if (!scrollContainerRef.current) return;

        const newCards = gsap.utils.toArray('.anim-card:not(.gsap-ready)');
        if (newCards.length === 0) return;

        newCards.forEach((card: any) => {
            card.classList.add('gsap-ready');

            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
                    scrollTrigger: {
                        scroller: scrollContainerRef.current,
                        trigger: card,
                        start: 'top 95%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        ScrollTrigger.refresh();

    }, { dependencies: [visiblePokemons], scope: scrollContainerRef });

    const renderedPokemonCards = useMemo(() => {
        if (visiblePokemons.length === 0) {
            return <p>Loading Pokemons...</p>;
        }

        return visiblePokemons.map((pokemon, index) => (
            <div
                key={pokemon.numPokedex}
                ref={(node) => setPokemonRef(index, node)}
                data-index={index}
                className={"anim-card"}
            >
                <Link href={`/pokemon/${pokemon.numPokedex}`} scroll={false}>
                    <PokedexCard
                        name={pokemon.nomPokemon}
                        image={pokemon.image}
                        types={pokemon.types.map(type => ({
                            nomType: type.nomType,
                            image: type.image
                        }))}
                    />
                </Link>
            </div>
        ));
    }, [visiblePokemons, setPokemonRef]);

    return (
        <section className="mt-25">
            <div className="flex span-gap-1 justify-center flex-wrap">
                <div className="bg-blue text-white span-w-3-wider text-32 font-bold font-Geist flex items-center justify-center">
                    <h3>{currentGenerationName || 'Loading...'}</h3>
                </div>

                <div ref={scrollContainerRef} className="flex flex-wrap gap-grid justify-center xl:justify-normal span-w-6-wider max-h-116 overflow-y-auto scrollbar-w">
                    {renderedPokemonCards}
                    <div ref={loadMoreRef} className="w-full h-4"></div>
                </div>
            </div>
            <div className="mt-8">
                <Input
                    type="text"
                    placeholder="Rechercher un Pokémon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={selectedType || ''} onValueChange={(e) => setSelectedType(e == "all" ? null : e)}>
                    <SelectTrigger>
                        <SelectValue placeholder={"Tous les types"}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            <SelectItem value={"all"}>Tous les types</SelectItem>
                            {allType.map(type => (
                                <SelectItem value={type.nomType} key={type.id}>{type.nomType}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={selectedGeneration || ''} onValueChange={(e) => setSelectedGeneration(e == "all" ? null : e)}>
                    <SelectTrigger>
                        <SelectValue placeholder={"Toutes les Générations"}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Générations</SelectLabel>
                            <SelectItem value={"all"}>Toutes les générations</SelectItem>
                            {allGen.map(gen => (
                                <SelectItem value={gen.nomGeneration} key={gen.numGeneration}>{gen.nomGeneration}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </section>
    );
};