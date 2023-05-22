import { ALL } from "dns";
import { prisma } from "../../plugins/prisma";

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) throw new Error("Aucun id n'a été fourni");

  return await prisma.user.findFirst({
    where: {
      id: event.context.params?.id,
    },
    select: {
      id: true,
      image: true,
      name: true,
      projects: {
        select: {
          project: {
            select: {
              color: true,
              client: true,
              members: {
                select: {
                  id: true,
                  user: true,
                  role: true
                }
              },
              name: true
            }
          }
        },

      },

      logs: true,
    }
  });
});
