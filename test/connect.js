const { parse } = require('..')
const assert = require('assert')

describe('连接报文', () => {
  it('功能测试', () => {
    const buf = Buffer.from([
      16, 56, // Header
      0, 4, // Protocol ID length
      77, 81, 84, 84, // Protocol ID
      3, // Protocol version
      246, // Connect flags
      0, 30, // Keepalive
      0, 5, // Client ID length
      104, 101, 108, 108, 111, // Client ID
      0, 6, // Will topic length
      228, 189, 160, 229, 165, 189, // Will topic
      0, 8, // Will payload length
      112, 97, 121, 108, 111, 97, 100, 126, // Will payload
      0, 8, // Username length
      117, 115, 101, 114, 110, 97, 109, 101, // Username
      0, 9, // Password length
      112, 52, 36, 36, 119, 48, 194, 163, 100 // Password
    ])

    for (const b of parse(buf)) {
      console.log(b)
      assert.equal(b.password, 'p4$$w0£d')
    }
  })
})
