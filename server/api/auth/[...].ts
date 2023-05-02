import { NuxtAuthHandler } from '#auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '~/server/plugins/prisma'
import GithubProvider from 'next-auth/providers/github'

const config = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: config.secret,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: config.github.clientId,
      clientSecret: config.github.clientSecret
    })
  ]
})