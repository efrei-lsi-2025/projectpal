import { prisma } from "../../plugins/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, color, description, client, ticketStates, projectMembers } =
    body;

  const project = await prisma.project.create({
    data: {
      name,
      description,
      client:
        client.length > 0
          ? {
              connectOrCreate: {
                where: {
                  name: client,
                },
                create: {
                  name: client,
                },
              },
            }
          : undefined,
      color,
      members: {
        create: projectMembers,
      },
      ticketStates: {
        create: ticketStates,
      },
    },
  });

  return project;
});
