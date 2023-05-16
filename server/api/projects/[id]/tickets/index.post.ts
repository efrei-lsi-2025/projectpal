import { prisma } from '../../../../plugins/prisma';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  // Get the body
  const body = await readBody(event);

  const session = await getServerSession(event);
  const reporter = session?.user;

  if (!reporter) throw new Error("Pas d'utilisateur");

  // get project's ID
  const projectId = Number(event.context.params?.id);

  // Send the ticket thanks to a post request to the BDD

  const ticket = await prisma.ticket.create({
    data: {
      name: body.name,
      description: body.description,
      reporter: {
        connect: {
          projectId_userId: {
            projectId,
            userId: reporter?.id,
          },
        },
      },
      assignee: {
        connect: {
          projectId_userId: {
            projectId,
            userId: body.assignee,
          },
        },
      },
      project: {
        connect: {
          id: projectId,
        },
      },
      state: {
        connect: {
          projectId_name: {
            name: body.status,
            projectId,
          },
        },
      },
    },
  });

  return ticket;
});
