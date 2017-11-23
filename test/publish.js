
const { parse } = require('..')
const assert = require('assert')

describe('Publish 报文', () => {
  it('all', () => {
    const buf = Buffer.from([
      61, 12, // Header
      0, 4, // Topic length
      116, 101, 115, 116, // Topic
      0, 10, // Message ID
      116, 101, 115, 116 // Payload
    ])

    for (const b of parse(buf)) {
      console.log(b)
      // delete b.buffer
      // assert.equal(b.password, 'p4$$w0£d')
    }
  })
})
