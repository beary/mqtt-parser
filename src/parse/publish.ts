import { Packet } from '../packet'

export default (remain: Buffer, packet: Packet.Publish) => {
  packet.flagOpt = {
    DUP: packet.flags >> 3 & 1,
    QoS: packet.flags >> 1 & 3,
    RETAIN: packet.flags & 1
  }
  let index = 0
  const topicLength = remain.readUInt16BE(index)
  packet.topicName = remain
    .slice(2, 2 + topicLength)
    .toString()
  index += 2 + topicLength

  packet.packetId = remain.readUInt16BE(index)
  index += 2

  packet.payload = remain.slice(index)
  return packet
}
