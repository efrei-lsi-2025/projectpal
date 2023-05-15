import { prisma } from "../../plugins/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, color, description, client, ticketStates, projectMembers } =
    body;

  console.log(body);

  const project = await prisma.project.create({
    data: {
      name: name,
      description: description,
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
      color: color,
      members: {
        create: projectMembers,
      },
      ticketStates: ticketStates,
    },
  });

  return project;
});