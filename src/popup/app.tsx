import { FC, useEffect, useRef, useState } from 'react'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import useStorage, { storage } from '@src/lib/chrome/storage'

/**
 * Local imports
 */
import trpc from '@lib/trpc/client'

/**
 * App Component
 * Entry point for the popup
 */
const App: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { data, isLoading } = trpc.user.useQuery()
  const { value, set } = useStorage('foo')
  const handleSet = () => set(inputRef.current!.value)

  return (
    <main className="grid h-[500px] w-[700px] place-items-center p-6">
      <div className="flex w-full flex-col items-start justify-center">
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
          <input ref={inputRef} type="text" className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2" />
          <button className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white" onClick={handleSet}>
            Update Local Storage
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
