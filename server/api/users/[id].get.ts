import { prisma } from "../../plugins/prisma";

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) throw new Error("Aucun id n'a été fourni");

  return await prisma.user.findFirst({
    where: {
      id: event.context.params?.id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      logs: {
        select: {
          text: true,
          createdAt: true,
        },
      },
      projects: {
        select: {
          projectId: true,
          _count: {
            select: {
              assignedTo: true,
            },
          },
        },
      },
    },
  });
});
