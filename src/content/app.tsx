import React from 'react'

import MessageComponent from '@content/components/message'

const ContentScriptApp = () => {
  return (
    <div className="fixed top-4 right-4 z-max max-w-xs shadow-md shadow-purple-400/20">
      <div className="rounded-md bg-white font-sans shadow-subtle ring-1 ring-purple-300">
        <MessageComponent />
      </div>
    </div>
  )
}

export default ContentScriptApp
