import { prisma } from "../../plugins/prisma";


export default defineEventHandler(async (event) => {
<<<<<<<< HEAD:server/api/ticket/clients.get.ts

    return await prisma.client.findMany({
        select: {
            name: true,
        }
    })
========
    return await prisma.client.findMany()
>>>>>>>> dev:server/api/client/index.get.ts
})