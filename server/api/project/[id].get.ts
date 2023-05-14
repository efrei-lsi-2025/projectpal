import { prisma } from "../../plugins/prisma";

export default defineEventHandler(async (event) => {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(event.context.params?.id),
    },
    include: {
      members: true,
      client: true,
      ticketStates: true,
      tickets: true,
    },
  });

  return project;
});
