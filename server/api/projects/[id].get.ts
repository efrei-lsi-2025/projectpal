import { prisma } from "../../plugins/prisma";

const TicketSelect = {
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
  const { id } = event.context.params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      description: true,
      color: true,
      client: {
        select: {
          id: true,
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
