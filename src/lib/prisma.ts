import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "../../generated/prisma8/contract.js";
import contractJson from "../../generated/prisma8/contract.json" with { type: "json" };

const connectionString = process.env.DATABASE_URL!;

export const db = postgres<Contract>({ url: connectionString, contract: contractJson as unknown as Contract });