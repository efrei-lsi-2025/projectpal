import { prisma } from "../../plugins/prisma"

export default defineEventHandler(async (event) => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            image: true,
        }
    })
})