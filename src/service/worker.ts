console.log({
  message: 'Service worker is running',
  timestamp: new Date().toISOString()
})

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.action.setBadgeText({ text: 'Vite' })
})

export {}
