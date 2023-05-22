import { prisma } from "../../plugins/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  // Get the body
  const body = await readBody(event);

  const session = await getServerSession(event);
  const user = session?.user;

  if (!user) throw new Error("Pas d'utilisateur");

  return await prisma.log.create({
    data: {
      text: body.text,
      userId: user.id,
    }
  })
});
