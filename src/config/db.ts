import "./env";
import { PrismaClient } from "@prisma/client";

/**
 * A single shared PrismaClient instance for the whole app. Creating a new
 * client per request would exhaust the database's connection pool.
 */
export const prisma = new PrismaClient();
