import type { AppRouter } from '@src/service/worker'
import { createTRPCReact } from '@trpc/react-query'

const trpc = createTRPCReact<AppRouter>()

export default trpc
