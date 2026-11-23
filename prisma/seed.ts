import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

config({ path: '.env.local' });
config({ path: '.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
    const dataDir = path.join(__dirname, 'data');

    const order = [
        'jeuxvideos',
        'generations',
        'lieux',
        'types',
        'talents',
        'nature',
        'categoriesObjets',
        'objets',
        'Moves',
        'pokemon',
        'pokemonTypes',
        'pokemonTalents',
        'eggGroups',
        'pokemonEggGroups'
    ];

    console.log("🌱 Début du remplissage de la base de données...");

    for (const table of order) {
        const filePath = path.join(dataDir, `${table}.json`);

        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            console.log(`⏳ Importation : ${table} (${data.length} lignes)`);

            try {
                // @ts-ignore : Nécessaire car TypeScript ne peut pas garantir que 'table' (string) est une clé valide de prisma
                await prisma[table].deleteMany();
                // @ts-ignore
                await prisma[table].createMany({ data, skipDuplicates: true });
            } catch (error) {
                console.error(`❌ Erreur sur ${table}:`, error);
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });