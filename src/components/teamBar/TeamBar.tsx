'use client';

import React, { useState } from 'react';
import { useTeamStore } from "@/hooks/useTeamStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTeam } from "@/lib/team";

function TeamBar() {
    const { slots, activeSlot, setActiveSlot } = useTeamStore((state) => state);

    // Nouveaux états pour gérer la sauvegarde
    const [showForm, setShowForm] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // On vérifie s'il y a au moins un Pokémon dans l'équipe
    const hasPokemon = slots.some((p) => p !== null);

    const handleSave = async () => {
        if (!teamName) return;
        setIsSaving(true);

        try {
            // 1. Extraire les IDs des Pokémon (en ignorant les cases vides)
            // ATTENTION : Remplace 'p.id' par la bonne propriété de ton objet (ex: p.numPokedex)
            const pokemonIds = slots
                .filter((p) => p !== null)
                .map((p) => p.id);

            // 2. Appel de la Server Action
            await createTeam(teamName, "Équipe créée depuis le Teambuilder", pokemonIds);

            // 3. Succès
            alert("Équipe sauvegardée avec succès ! 🎉");
            setShowForm(false);
            setTeamName("");

        } catch (error) {
            console.error(error);
            alert("Erreur lors de la sauvegarde. Êtes-vous bien connecté ?");
        } finally {
            setIsSaving(false);
        }
    };

    const imagePoke = "/assets/images/Pokemon/";

    return (
        <div className="fixed bottom-2 right-2 flex flex-col items-end gap-4 z-50">

            {/* Formulaire de sauvegarde (qui s'affiche au clic) */}
            {showForm && (
                <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-200 flex flex-col gap-3 w-80 animate-in slide-in-from-bottom-4">
                    <h3 className="font-bold text-gray-800">Sauvegarder l'équipe</h3>
                    <Input
                        placeholder="Nom de l'équipe (ex: Mon Équipe Feu)"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        disabled={isSaving}
                    />
                    <div className="flex gap-2 justify-end mt-2">
                        <Button variant="outline" onClick={() => setShowForm(false)} disabled={isSaving}>
                            Annuler
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving || !teamName}>
                            {isSaving ? "Sauvegarde..." : "Valider"}
                        </Button>
                    </div>
                </div>
            )}

            {/* Barre des Pokémon (Ton code d'origine amélioré) */}
            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex gap-2">
                    {slots.map((pokemon, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveSlot(index)}
                            className={`w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-center bg-gray-50
                            ${activeSlot === index ? 'border-blue-500 shadow-md scale-105' : 'border-gray-200 hover:border-gray-300'}
                            `}
                        >
                            {pokemon ? (
                                <Image width={80} height={80} src={imagePoke + pokemon.image} alt={pokemon.name || "Pokemon"} className="object-contain p-1" />
                            ) : (
                                <span className="text-gray-300 text-2xl font-light">+</span>
                            )}
                        </div>
                    ))}
                </div>

                {hasPokemon && !showForm && (
                    <Button
                        onClick={() => setShowForm(true)}
                        className="ml-2 bg-green-600 hover:bg-green-700 shadow-md rounded-xl h-full py-4"
                    >
                        Sauvegarder
                    </Button>
                )}
            </div>

        </div>
    );
}

export default TeamBar;