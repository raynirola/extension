async function hash(value: string) {
  const encoder = new TextEncoder()
  const array = encoder.encode(value)
  const buffer = await crypto.subtle.digest('SHA-256', array)

  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export default hash
