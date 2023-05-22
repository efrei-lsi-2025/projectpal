import { ProjectMember } from "@prisma/client";
import { prisma } from "~/server/plugins/prisma";
import { ProjectUpdateDTO } from "~/utils/server";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody<ProjectUpdateDTO>(event);

  const project = await prisma.project.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      members: true
    }
  });

  if (!project) throw new Error("Project not found");

  const idToDelete = body.deleteMembers?.map(member => member.id);

  return await prisma.$transaction(async (tx) => {

    const updatedProject = await tx.project.update({
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

    const updatedMembers: Array<ProjectMember> | undefined = [];
    for (let member of body.updateMembers ?? []) {
      updatedMembers.push(await tx.projectMember.update({
        where: {
          id: member.id,
        },
        data: {
          role: member.role,
        }
      }));
    }

    await tx.projectMember.deleteMany({
      where: {
        id: {
          in: idToDelete,
        }
      }
    }
    );

    return { updatedProject, updatedMembers };
  });
});
