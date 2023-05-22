import { prisma } from "../../plugins/prisma";

export default defineEventHandler(async (event) => {
  // Get the body
  const body = await readBody(event);

  return await prisma.log.create({
    data: {
      text: body.text,
      userId: body.userId,
    }
  })
});
