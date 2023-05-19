import { prisma } from "~/server/plugins/prisma";
import { Member } from "../../components/projects/UserTable.vue";

export default defineEventHandler(async (event) => {
  const auth = useAuth();
  const user = await $fetch(`/api/user/${auth.data.value?.user?.name}`);

  const body = await readBody(event);
  console.log(body);
  const { text } = body;
  const log = await prisma.log.create({
    data: {
      user: auth,
    },
  });
  return 1;
});
