import type { FC } from 'react'
import trpc from '@lib/trpc/client'
import { ArrowPathIcon } from '@heroicons/react/20/solid'

const Loading: FC = () => {
  const { isLoading } = trpc.user.useQuery()

  if (!isLoading) return null

  return (
    <div className="mb-4 grid w-full place-items-center rounded-md border border-blue-500 bg-gray-50 p-4">
      <ArrowPathIcon className="h-6 w-6 animate-spin text-blue-500" />
    </div>
  )
}

export default Loading
