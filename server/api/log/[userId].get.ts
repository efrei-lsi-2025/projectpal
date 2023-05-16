import { prisma } from '~/server/plugins/prisma';

export default defineEventHandler(async (event) => {
  if (!event.context.params?.userId)
    throw new Error("Aucun userId n'a été fourni");

  return await prisma.log.findMany({
    where: {
      userId: event.context.params?.userId,
    },
    select: {
      text: true,
      user: true,
      createdAt: true,
    },
  });
});
