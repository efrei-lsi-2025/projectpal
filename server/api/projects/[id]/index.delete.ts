import { prisma } from "../../../plugins/prisma";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) error("Echec de la suppression. Un id de projet doit être fourni.");

  await prisma.project.delete({
    where: {
      id: Number(id),
    }
  })

  return true;
});
