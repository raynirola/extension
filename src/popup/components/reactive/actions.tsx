import type { FC } from 'react'
import trpc from '@lib/trpc/client'
import { useStorage } from '@src/lib/chrome/storage'

const Actions: FC = () => {
  const { data, isLoading } = trpc.user.useQuery()
  const { value, set, remove } = useStorage('user')

  const handleSet = () => set(data)

  const handleRemove = () => remove()

  if (isLoading) return null

  return (
    <div className="flex items-center space-x-2">
      <button
        className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSet}>
        Update Local User
      </button>

      {value && (
        <button
          className="rounded-md bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleRemove}>
          Remove Local User
        </button>
      )}
    </div>
  )
}

export default Actions
