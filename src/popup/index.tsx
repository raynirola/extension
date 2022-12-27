import '@src/styles/app.css'
import type { FC } from 'react'
import { createRoot } from 'react-dom/client'

/**
 * Local imports
 */
import bg from '@assets/images/bg.jpg'

/**
 * App Component
 * Entry point for the popup
 */
const App: FC = () => {
  return (
    <main className="grid h-[500px] w-[700px] place-items-center p-6">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-lg font-semibold tracking-tighter text-gray-700">Hello World</h1>
        <img src={bg} alt="bg" className="h-24 w-24 rounded-full object-cover" />
        <p className="mx-auto max-w-md text-center leading-snug text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ipsum omnis officia tenetur nemo quos commodi
          repellendus amet in provident nam excepturi explicabo asperiores ipsam, fugit aliquam eligendi molestias
          tempore. Asperiores tempora illo voluptates dicta doloremque nostrum harum ipsa recusandae!
        </p>
      </div>
    </main>
  )
}

/**
 * Root element
 */
const element = document.getElementById('root') as HTMLElement

/**
 * Mount and render the app
 */
createRoot(element).render(<App />)
