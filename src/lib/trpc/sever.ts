import { initTRPC } from '@trpc/server'

const trpc = initTRPC.create({
  isServer: false,
  allowOutsideOfServer: true
})

export default trpc
