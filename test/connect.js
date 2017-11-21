const { parse } = require('..')
const assert = require('assert')

describe('连接报文', () => {
  it('功能测试', () => {
    const buf = Buffer.from([
      16, 57, // Header
      0, 6, // Protocol ID length
      77, 81, 73, 115, 100, 112, // Protocol ID
      3, // Protocol version
      246, // Connect flags
      0, 30, // Keepalive
      0, 4, // Client ID length
      116, 101, 36, 116, // Client ID
      0, 6, // Will topic length
      116, 195, 178, 112, 105, 99, // Will topic
      0, 8, // Will payload length
      112, 97, 121, 194, 163, 111, 97, 100, // Will payload
      0, 8, // Username length
      117, 36, 101, 114, 110, 52, 109, 101, // Username
      0, 9, // Password length
      112, 52, 36, 36, 119, 48, 194, 163, 100 // Password
    ])

    for (const b of parse(buf)) {
      console.log(b)
      delete b.buffer
      assert.equal(b.password, 'p4$$w0£d')
    }
  })
})
