"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {headers} from "next/headers";

export async function createTeam(nomTeam: string, description: string, pokemonIds: number[]) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Utilisateur non authentifié");
    }

    const userId = session.user.id;

    const team = await db.orm.public.Team.create({
            nomTeam: nomTeam,
            description: description,
            userId: userId,
    });

    return team;
}