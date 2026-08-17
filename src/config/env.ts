import dotenv from "dotenv";

dotenv.config();

const requiredVars = ["DATABASE_URL"] as const;

for (const key of requiredVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}. Did you copy .env.example to .env?`);
  }
}

export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL as string,
};
