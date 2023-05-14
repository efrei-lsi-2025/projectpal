import { prisma } from "../../plugins/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const {
    name,
    color,
    description,
    client,
    ticketStates,
    projectMembers,
  } = body;

  const project = await prisma.project.create({
    data: {
      name: name,
      description: description,
      clientId: client?.id,
      color: color,
      members: {
        create: projectMembers,
      },
      ticketStates: {
        create: ticketStates,
      },
    },
  })

  const upsertClient = await prisma.client.upsert({
    where: {
      id: client.id,
    },
    update: {
      projects : {connect: {id : project.id }}
    },
    create: {
      name: client.name,
      projects : {connect: {id : project.id }}
    },
  })
  // const exist_client = await prisma.client.findUnique({
  //   where: {
  //     id : client.id,
  //   },
  // })
  // if (exist_client) {
  //   const updateClient = await prisma.client.update({
  //     where: { id: client.id},
  //     data: {
  //       projects : {
  //         connect: {
  //           project.id,
  //         }
  //       },
  //     },
  //   })
  //   return client
  // }
  // const clientDB = await prisma.client.create({
  //   data: {
  //     name : name,
  //     projects : {connect: {id : project.id }},
  //   }
  // })
  return project; 


});



