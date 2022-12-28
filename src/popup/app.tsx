import type { FC } from 'react'

/**
 * Local imports
 */
import Remote from '@popup/components/reactive/remote'
import Loading from '@src/popup/components/reactive/loading'
import Actions from '@src/popup/components/reactive/actions'
import Subscribed from '@popup/components/reactive/subscribed'

/**
 * App Component
 * Entry point for the popup
 */
const App: FC = () => {
  return (
    <main className="h-[500px] w-[700px] bg-gray-50 p-6">
      <div className="flex w-full flex-col items-start justify-center">
        <Subscribed />
        <Remote />
        <Loading />
        <Actions />
      </div>
    </main>
  )
}

export default App
