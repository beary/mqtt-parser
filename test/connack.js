const { parse } = require('..')
const assert = require('assert')

describe('连接反馈', () => {
  it('正常', () => {
    for (const p of parse(Buffer.from([32, 2, 0, 5])))
      console.log(p)
  })
})
