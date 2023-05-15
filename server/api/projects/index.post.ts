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
      clientId: client?.id,
      color: color,
      members: {
        create: projectMembers,
      },
      ticketStates: ticketStates,
    },
  });

  return project;
});
