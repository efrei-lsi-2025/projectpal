import { prisma } from "~/server/plugins/prisma";
import { ProjectUpdateDTO } from "~/utils/server";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody<ProjectUpdateDTO>(event);

  let project = await prisma.project.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      members: true
    }
  });

  if (!project) throw new Error("Project not found");

  return await prisma.project.update({
    where: {
      id: Number(id),
    },
    data: {
      name: body.name,
      description: body.description,
      color: body.color,
      client:
        body.client.length > 0
          ? {
            connectOrCreate: {
              where: {
                name: body.client,
              },
              create: {
                name: body.client,
              },
            },
          }
          : undefined,
      members: {
        create: body.newMembers,
      }
    },
  });
});
