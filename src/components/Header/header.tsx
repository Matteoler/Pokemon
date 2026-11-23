'use client';
import React from 'react';
import Link from 'next/link';
import {authClient} from "@/lib/auth-client";

const links = [
    { href: '/', label: 'Accueil' },
    { href: '/anime', label: 'Anime' },
    { href: '/pokedex', label: 'Pokedex' },
    { href: '/jeu-video', label: 'Jeux Vidéos' },
];

export const Header = () => {
const { data: session } = authClient.useSession();
    return (
        <header>
            <nav className="xl:span-w-5-wide w-[96%] text-white bg-dark-blue/60 top-2 right-2 fixed rounded-md z-20">
                <ul className="flex justify-between font-Geist px-5 py-5">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    {session ? (
                        <li>
                            <button onClick={() => { authClient.signOut(); }} className="text-red-400 hover:text-red-300">
                                Se déconnecter
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link href="/signUp">Sign Up</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};