import { prisma } from "~/server/plugins/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const body = await readBody(event);

  const ticket = await prisma.ticket.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      state: true,
    },
  });

  if (!ticket) throw new Error("Ticket not found");

  await prisma.ticket.update({
    where: {
      id: Number(id),
    },
    data: {
      state: {
        connect: {
          projectId_name: {
            name: body.state,
            projectId: ticket.projectId,
          },
        },
      },
    },
  });

  return ticket;
});
