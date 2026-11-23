import React from 'react';
import Link from "next/link";

function Footer() {
    const links = [
        { href: '/', label: 'Accueil' },
        { href: '/anime', label: 'Anime' },
        { href: '/pokedex', label: 'Pokedex' },
        { href: '/jeu-video', label: 'Jeux Vidéos' },
    ];

    return (
        <footer className={"bg-blue"}>
            <h2 className={"text-5xl md:text-[135px] text-center font-black text-white"}>Pocket Monster</h2>
            <ul>
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className={"text-white"}>{link.label}</Link>
                    </li>
                ))}
            </ul>

        </footer>
    );
}

export default Footer;