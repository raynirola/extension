import type { FC } from 'react'
import trpc from '@lib/trpc/client'

const Remote: FC = () => {
  const { data, isLoading } = trpc.user.useQuery()

  if (isLoading) return null

  return (
    <div className="mb-4 block w-full rounded-md border border-blue-500 bg-white p-4">
      <h1 className="text-sm font-medium text-gray-800">Remote User</h1>
      <p className="text-xs text-gray-600">Random user from the API.</p>
      <code className="mt-2 block">
        <pre className="text-xs font-medium text-gray-700">{JSON.stringify(data, null, 2)}</pre>
      </code>
    </div>
  )
}

export default Remote
