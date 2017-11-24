import { Packet } from '../packet'

export default (remain: Buffer, packet: Packet.Connect) => {
  let index = 0

  // parse header
  const protocolNameLength = remain.readUInt16BE(0)
  packet.protocolName = remain.slice(2, index += 2 + protocolNameLength).toString()

  packet.protocolLevel = remain[index++]

  const b = remain[index++]
  packet.connectFlags = {
    username: b >> 7 & 0x01,
    password: b >> 6 & 0x01,
    willRetain: b >> 5 & 0x01,
    willQoS: (b >> 3 & 0x02) + (b >> 3 & 0x01),
    willFlag: b >> 2 & 0x01,
    cleanSession: b >> 1 & 0x01,
    reserved: b & 0x01
  }

  if (packet.connectFlags.reserved)
    throw new Error('Connect flags reserved should be 0')

  packet.keepAlive = remain.readUInt16BE(index)
  index += 2

  // parse payload
  const cliendIdLength = remain.readUInt16BE(index)
  index += 2
  if (!cliendIdLength && !packet.connectFlags.cleanSession)
    throw new Error('CliendId\' length is 0, but CleanSession is not 0')
  else {
    const buf = remain.slice(index, index += cliendIdLength)
    // console.log(cliendIdLength, buf)
    packet.clientId = buf.toString()
  }

  if (packet.connectFlags.willFlag) {
    // will topic
    const willTopicLength = remain.readUInt16BE(index)
    index += 2
    packet.willTopic = remain.slice(index, index += willTopicLength).toString()

    // will message
    const willMessageLength = remain.readUInt16BE(index)
    index += 2
    packet.willMessage = remain.slice(index, index += willMessageLength).toString()
  }

  if (packet.connectFlags.username) {
    const userNameLength = remain.readUInt16BE(index)
    index += 2
    packet.username = remain.slice(index, index += userNameLength).toString()
  }

  if (packet.connectFlags.password) {
    const passwordLength = remain.readUInt16BE(index)
    index += 2
    packet.password = remain.slice(index, index += passwordLength).toString()
  }
  return packet
}
