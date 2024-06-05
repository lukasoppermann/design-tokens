const utf8ToBase64 = (text: string): string => {
  const utf8EncodedBytes = new TextEncoder().encode(text)
  const binString = Array.from(utf8EncodedBytes, (byte) =>
    String.fromCodePoint(byte)
  ).join('')
  return btoa(binString)
}

export { utf8ToBase64 }
