declare module '*.png' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare module '*.jpeg' {
  const content: any
  export default content
}

declare module '*.gif' {
  const content: any
  export default content
}

declare module '*.svg' {
  const content: any
  export default content
}

type IdentityMessage = {
  type: 'IDENTITY'
}

type GreetingMessage = {
  type: 'GREETING'
}

type IdentityResponse = {
  type: 'IDENTITY'
  payload: chrome.identity.UserInfo
}

type GreetingResponse = {
  type: 'GREETING'
  payload: string
}

type Message = IdentityMessage | GreetingMessage

type MessageResponse = IdentityResponse | GreetingResponse

interface ChromRuntimeMessageHandler<M = Message, R = MessageResponse> {
  (message: M, sender: chrome.runtime.MessageSender, sendResponse: (response?: R) => void): void
}
