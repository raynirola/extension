import type { FC } from 'react'
import { chromeLink } from 'trpc-chrome/link'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * Local imports
 */
import App from '@content/app'
import initializeDOM from '@utils/dom'
import trpc from '@lib/trpc/client'

const port = chrome.runtime.connect()
const queryClient = new QueryClient({})
const trpcClient = trpc.createClient({ links: [chromeLink({ port })] })

/**
 * Root Component
 */
const Root: FC = () => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

/**
 * Render the Root component
 */
;(async () => await initializeDOM(<Root />))()
