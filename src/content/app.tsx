import type{ FC } from 'react'
import trpc from '@src/lib/trpc/client'

/**
 * App Component
 * Entry point for the content script
 */
const App: FC = () => {
  const { data } = trpc.greeting.useQuery(undefined, { initialData: { message: 'Loading...' } })
  return (
    <div className="fixed top-2 right-2 z-max rounded bg-white px-6 py-3 font-sans shadow-subtle ring-1 ring-brand/10">
      <h1 className="font-semibold text-gray-700">Content Script</h1>
      <code className="mt-1 block">
        <pre className="text-xs text-gray-500">{data?.message}</pre>
      </code>
    </div>
  )
}

export default App
