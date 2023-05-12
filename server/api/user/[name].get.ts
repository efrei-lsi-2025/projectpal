import { prisma } from "~/server/plugins/prisma"

export default defineEventHandler(async (event) => {

    return await prisma.user.findFirst({
        where: {
            name: event.context.params?.name.replace("%20", " "),
        },
        select: {
            id: true,
            name: true,
            image: true,
        }
    })
})