import { FontFamily, fontSize, letterSpacing, lineHeight } from "./src/config/tailwind/fonts.cjs";
import plugin from "tailwindcss/plugin";
import grid from "./src/config/tailwind/grid.js";

/**
 * Fonction utilitaire pour calculer la largeur ou l'espace
 * @param {number} i - Nombre de colonnes
 * @param {string} [variant] - Variantes comme 'wide', 'wider' ou undefined
 * @returns {string} - La valeur calc() CSS
 */
const calculateValue = (i, variant) => {
    // Logique standard : i colonnes + (i-1) gouttières
    let gutterMultiplier = Math.max(0, i - 1);

    // Logique pour les variantes wide/wider
    if (variant === "wide" || variant === "wider") {
        // Si wide, on garde 'i' gouttières, sinon on plafonne à 12
        gutterMultiplier = variant === "wide" ? i : Math.min(12, i + 1);
    }

    return `calc(${i} * var(--column) + ${gutterMultiplier} * var(--gutter))`;
};

/**
 * Génère les classes utilitaires pour la grille
 * @param {string} property - La propriété CSS (width, gap, etc.)
 * @param {string} prefix - Le préfixe de la classe (w, gap)
 * @param {string[]} [variants] - Liste des variantes optionnelles
 */
const generateGridUtilities = (property, prefix, variants = []) => {
    const utilities = {};
    const count = 12; // Nombre de colonnes max

    for (let i = 0; i <= count; i++) {
        // Génération standard (ex: .span-w-1)
        if (variants.length === 0) {
            utilities[`.span-${prefix}-${i}`] = {
                [property]: calculateValue(i),
            };
        } else {
            // Génération avec variantes (ex: .span-w-3-wide)
            variants.forEach((variant) => {
                utilities[`.span-${prefix}-${i}-${variant}`] = {
                    [property]: calculateValue(i, variant),
                };
            });
        }
    }
    return utilities;
};

/**
 * Crée les variables CSS pour la grille
 */
const createGridVariables = (columns, gutter, margin) => {
    const windowWidth = "100vw";
    const gridWidth = `calc(${windowWidth} - 2 * ${margin}px)`;
    // Note: J'ai ajouté des parenthèses pour sécuriser l'ordre des opérations CSS
    const columnWidth = `calc((${gridWidth} - (${columns} - 1) * ${gutter}px) / ${columns})`;

    return {
        "--columns": columns.toString(),
        "--gutter": `${gutter}px`,
        "--margin": `${margin}px`,
        "--grid-width": gridWidth,
        "--column": columnWidth,
    };
};

/** @type {import('tailwindcss').Config} */
const config = {
    // Assurez-vous que le chemin content correspond à votre structure Next.js / Vite
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: FontFamily,
            fontSize: fontSize,
            letterSpacing: letterSpacing,
            lineHeight: lineHeight,
        },
    },
    safelist: [], // À n'utiliser qu'en dernier recours, préférez une détection automatique
    plugins: [
        plugin(({ addBase, addUtilities }) => {
            // 1. Définition des variables CSS globales (:root) et media queries
            addBase({
                ":root": createGridVariables(grid.desktop.columns, grid.desktop.gutter, grid.desktop.margin),
                "@media (max-width: 899px)": {
                    ":root": createGridVariables(grid.tablet.columns, grid.tablet.gutter, grid.tablet.margin),
                },
                "@media (max-width: 459px)": {
                    ":root": createGridVariables(grid.mobile.columns, grid.mobile.gutter, grid.mobile.margin),
                },
            });

            // 2. Génération des utilitaires de grille personnalisés
            const customUtilities = {
                ...generateGridUtilities("width", "w"),
                ...generateGridUtilities("gap", "gap"),
                ...generateGridUtilities("width", "w", ["wide", "wider"]),
                ...generateGridUtilities("gap", "gap", ["wide", "wider"]),
            };

            addUtilities(customUtilities);
        }),
    ],
};

export default config;