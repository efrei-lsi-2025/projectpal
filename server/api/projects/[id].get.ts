import { prisma } from "../../plugins/prisma";
import { TicketSelect } from "../tickets/[id].get";

export default defineEventHandler(async (event) => {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(event.context.params?.id),
    },
    select: {
      id: true,
      name: true,
      description: true,
      color: true,
      client: {
        select: {
          name: true,
        },
      },
      members: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          role: true,
        },
      },
      ticketStates: {
        select: {
          name: true,
          order: true,
          tickets: {
            select: TicketSelect,
          },
        },
        orderBy: {
          order: "asc",
        },
      },
      tickets: {
        where: {
          state: null,
        },
        select: TicketSelect,
      },
    },
  });

  return project;
});
