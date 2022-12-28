import type { FC } from 'react'
import { useRef } from 'react'
import { ArrowPathIcon } from '@heroicons/react/20/solid'

/**
 * Local imports
 */
import trpc from '@lib/trpc/client'
import Subscribed from '@popup/subscribed'
import { useStorage } from '@lib/chrome/storage'

/**
 * App Component
 * Entry point for the popup
 */
const App: FC = () => {
  const { data, isLoading } = trpc.user.useQuery()
  const { value, set } = useStorage('user')

  const inputRef = useRef<HTMLInputElement>(null)
  const handleSet = () => set({ age: 20, name: inputRef.current!.value })

  return (
    <main className="h-[500px] w-[700px] bg-gray-50 p-6">
      <div className="flex w-full flex-col items-start justify-center">
        <Subscribed />
        {isLoading && <ArrowPathIcon className="h-6 w-6 animate-spin text-blue-500" />}
        {data && (
          <code className="block w-full rounded-md border border-blue-500 bg-gray-50 p-4">
            <pre className="text-xs font-medium text-gray-700">{JSON.stringify(data, null, 2)}</pre>
          </code>
        )}
        <code className="mt-4 block w-full rounded-md border border-blue-500 bg-gray-50 p-4">
          <pre className="text-xs font-medium text-gray-700">{JSON.stringify(value, null, 2)}</pre>
        </code>
        <div className="mt-4 flex items-center space-x-2">
          <input
            placeholder="Enter a name"
            ref={inputRef}
            type="search"
            className="w-64 rounded-md border border-gray-300 bg-gray-50 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
          className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSet}>
            Update Local Storage
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
