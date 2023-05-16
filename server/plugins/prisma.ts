import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

export default defineNitroPlugin((nitroApp) => {
  prisma = new PrismaClient();
});

export { prisma };
