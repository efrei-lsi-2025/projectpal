import { NuxtAuthHandler } from "#auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/plugins/prisma";
import GithubProvider from "next-auth/providers/github";

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: config.secret,
  adapter: PrismaAdapter(prisma),
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: config.github.clientId,
      clientSecret: config.github.clientSecret,
    }),
  ],
});
