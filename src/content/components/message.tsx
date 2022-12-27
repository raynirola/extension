import React, { FC } from 'react'
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/20/solid'

const MessageComponent: FC = () => {
  const [message, setMessage] = React.useState<IdentityResponse | null>()

  React.useEffect(() => {
    const getIdentify = async () => {
      const data = await chrome.runtime.sendMessage<IdentityMessage, IdentityResponse>({ type: 'IDENTITY' })
      setMessage(data)
    }

    getIdentify()
  }, [])

  const handleClose = () => setMessage(null)

  if (!message) {
    return (
      <div className="grid h-10 w-10 place-items-center">
        <ArrowPathIcon className="h-5 w-5 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="relative p-4">
      <code className="text-sm text-gray-600">
        <pre>{JSON.stringify(message, null, 2)}</pre>
      </code>
      <button
        className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-md hover:bg-gray-100"
        onClick={handleClose}>
        <XMarkIcon className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  )
}

export default MessageComponent
