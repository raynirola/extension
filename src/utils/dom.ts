import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

/**
 * Local imports
 */
import hash from '@utils/hash'

/**
 * Initialize a DOM element with a React component.
 */
const initializeDOM = async (component: ReactNode) => {
  /**
   * Isolate the document body
   */
  const body = document.body
  body.style.isolation = 'isolate'

  /**
   * Generate a unique ID for the DOM element
   */
  const id = await hash(`${chrome.runtime.id}-${Date.now()}`)

  /**
   * Create a DOM Node for the example content.
   * SetAttribute ID to chrome.runtime.id
   * Reset style to default
   */
  const root = document.createElement('div')
  root.setAttribute('id', id)
  root.style.all = 'initial'
  root.style.fontSize = '16px !important'

  /**
   * Attach shadow root to the element
   */
  const shadow = root.attachShadow({ mode: 'open' })

  /**
   * Create a style node and add set required attributes
   */
  const style = document.createElement('link')
  style.setAttribute('rel', 'stylesheet')
  style.setAttribute('type', 'text/css')
  style.setAttribute('href', chrome.runtime.getURL('src/styles/app.css'))

  /**
   * Create a div node and add set required attributes
   * This is where the content will be rendered
   */
  const element = document.createElement('div')
  element.style.isolation = 'isolate'

  /**
   * Append the style and app nodes to the shadow root
   */
  shadow.append(style, element)

  /**
   * Get root node and append the element to it
   * Doing this will render the content outside the regular document flow
   */
  document.documentElement.appendChild(root)

  /**
   * Mount and render the app
   */
  createRoot(element).render(component)
}

export default initializeDOM
