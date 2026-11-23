'use client';

import { create } from 'zustand';

type PokemonSlot = {
    name: string;
    id: number;
    image: string;
}

interface TeamState {
    slots: (PokemonSlot | null)[];
    activeSlot: number | null;

    setActiveSlot: (index: number | null) => void;
    setPokemonInSlot: (pokemon : PokemonSlot | null) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
    slots: Array(6).fill(null),
    activeSlot: null,

    setActiveSlot: (index) => set({ activeSlot: index }),
    setPokemonInSlot: (pokemon) => set((state) => {
        let targetSlot = state.activeSlot;

        if (targetSlot === null) {
            targetSlot = state.slots.findIndex((slot) => slot === null);
        }

        if (targetSlot !== -1 && targetSlot !== null) {
            const newSlots = [...state.slots];
            newSlots[targetSlot] = pokemon;
            return { slots: newSlots, activeSlot: null };
        }
        return state;
    }),
}));