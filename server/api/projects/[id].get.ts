import { prisma } from "../../plugins/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
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
