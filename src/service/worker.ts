import trpc from '@lib/trpc/sever'
import { TRPCError } from '@trpc/server'
import type { User } from '@interface/user'
import { createChromeHandler } from 'trpc-chrome/adapter'

const appRouter = trpc.router({
  greeting: trpc.procedure.query(async () => ({ message: 'Hello World 🎉' })),
  user: trpc.procedure.query(async () => {
    try {
      const random = Math.floor(Math.random() * 10) + 1
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${random}`)
      const data: User = await res.json()

      return { id: data.id, name: data.name, username: data.username, email: data.email }
    } catch {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
    }
  })
})

export type AppRouter = typeof appRouter

createChromeHandler({ router: appRouter })

export {}
