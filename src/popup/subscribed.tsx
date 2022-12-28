import type { FC } from 'react'
import { useStorage } from '@src/lib/chrome/storage'

const Subscribed: FC = () => {
  const { value } = useStorage('user')

  return (
    <div className="mb-4 block w-full rounded-md border border-blue-500 bg-white p-4">
      <h1 className="text-sm font-medium text-gray-800">Subscribed Component</h1>
      <p className="text-xs text-gray-600">This component will update when the value of foo changes.</p>
      <code className="mt-2 block text-sm font-semibold">
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </code>
    </div>
  )
}

export default Subscribed
