import { prisma } from "~/server/plugins/prisma";

export const TicketSelect = {
  id: true,
  name: true,
  description: true,
  assignee: {
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  },
  reporter: {
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  },
};

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);

  const ticket = await prisma.ticket.findFirst({
    where: {
      id: Number(id),
    },
    select: TicketSelect,
  });

  if (!ticket) throw new Error("Ticket not found");

  return ticket;
});
