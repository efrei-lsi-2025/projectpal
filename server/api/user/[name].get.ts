import { prisma } from "~/server/plugins/prisma";

export default defineEventHandler(async (event) => {
  if (!event.context.params?.name) throw new Error("Aucun nom n'a été fourni");

  return await prisma.user.findFirst({
    where: {
      name: decodeURIComponent(event.context.params?.name),
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
});
