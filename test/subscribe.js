const { parse } = require('..')
const assert = require('assert')

describe('Subscribe', () => {
  it('正常', () => {
    for (const p of parse(
      Buffer.from([
        130, 23, // Header (publishqos=1length=9)
        0, 6, // Message ID (6)
        0, 4, // Topic length,
        116, 101, 115, 116, // Topic (test)
        0, // Qos (0)
        0, 4, // Topic length
        117, 101, 115, 116, // Topic (uest)
        1, // Qos (1)
        0, 4, // Topic length
        116, 102, 115, 116, // Topic (tfst)
        2 // Qos (2)
      ])
    )) {
      console.log(p)
    }
  })
})
