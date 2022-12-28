import 'tailwindcss/tailwind.css'
import type { FC } from 'react'
import { createRoot } from 'react-dom/client'
import { chromeLink } from 'trpc-chrome/link'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * Local imports
 */
import App from '@popup/app'
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
 * Root element
 */
const element = document.getElementById('root') as HTMLElement

/**
 * Mount and render the Root component
 */
createRoot(element).render(<Root />)
