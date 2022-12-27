import { FC } from 'react'
import { ArrowPathIcon } from '@heroicons/react/20/solid'

/**
 * Local imports
 */
import trpc from '@lib/trpc/client'

/**
 * App Component
 * Entry point for the popup
 */
const App: FC = () => {
  const { data, isLoading } = trpc.user.useQuery()
  return (
    <main className="grid h-[500px] w-[700px] place-items-center p-6">
      {isLoading && <ArrowPathIcon className="h-6 w-6 animate-spin text-blue-500" />}
      {data && (
        <code>
          <pre className="text-xs font-medium text-gray-700">{JSON.stringify(data, null, 2)}</pre>
        </code>
      )}
    </main>
  )
}

export default App
