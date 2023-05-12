import { prisma } from "~/server/plugins/prisma"


export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const name = body.name;
    const description = body.description;
    const clientId = body.client.id;
    const ticketStates = body.ticketStates;
    const projectMembers = body.projectMembers;

    const projectData = {
        name: name,
        description: description,
        clientId: clientId,
        members: {
            create: projectMembers
        },
        ticketStates: {
            create: ticketStates
        }
    };

    const project = await prisma.project.create({ data: projectData });
    return { projectData };
})