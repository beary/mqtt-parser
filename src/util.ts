export const getLen = (buffer: Buffer) => {
  let i = 0
  let value = 0
  for (const b of buffer.slice(1, 5)) {
    value += (b & 0x7F) * Math.pow(128, i++)
    if (!(b & 0x80))
      break
  }
  return { value, bytesNum: i }
}