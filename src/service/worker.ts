import type { User } from '@interface/user'
import trpc from '@src/lib/trpc/sever'
import { TRPCError } from '@trpc/server'
import { createChromeHandler } from 'trpc-chrome/adapter'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

console.log({
  message: 'Service worker is running',
  timestamp: new Date().toISOString()
})

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.action.setBadgeText({ text: 'Vite' })
})

const appRouter = trpc.router({
  greeting: trpc.procedure.query(async () => {
    await delay(3000)
    return { message: 'Hello world updated' }
  }),
  user: trpc.procedure.query(async () => {
    try {
      await delay(3000)
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
      const data: User = await res.json()

      return {
        id: data.id,
        name: data.name,
        username: data.username
      }
    } catch {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
    }
  })
})

export type AppRouter = typeof appRouter

createChromeHandler({ router: appRouter })
export {}
