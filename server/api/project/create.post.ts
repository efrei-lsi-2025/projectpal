import { prisma } from "~/server/plugins/prisma"


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return body;
})