import { prisma } from "../../plugins/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    
    // const {
    //     name,
    //     description,
    //     assignedProjects,
    //     assignedDevelopers,
    //     status,
    //     generatedId,
    // } = body;

    // const project = await prisma.project.create({
    // data: {
    //   name: name,
    //   description: description,
    //   project: assignedProjects,
    //   assignee: assignedDevelopers,
    //   state: status,
    //   id: generatedId,
    //   members: {
    //     create: projectMembers,
    //   },
    //   ticketStates: {
    //     create: ticketStates,
    //   },
    // },
});