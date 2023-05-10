import { prisma } from "../../plugins/prisma"

export default defineEventHandler(async (event) => {
    return await prisma.client.findMany({
        select: {
            id: true,
            name: true,
        }
    })
})