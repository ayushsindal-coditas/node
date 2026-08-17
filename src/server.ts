import { env } from "./config/env";
import { prisma } from "./config/db";
import app from "./app";

const server = app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});

// Close the Prisma connection and the HTTP server cleanly on shutdown,
// so a restart (e.g. from nodemon/ts-node-dev) doesn't leak DB connections.
const shutdown = async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
