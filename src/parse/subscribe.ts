import { Packet } from '../packet'

export default (remain: Buffer, packet: Packet.Subscribe) => {
  let index = 0
  packet.packetId = remain.readUInt16BE(index)
  index += 2

  packet.topics = []
  let topicLength: number
  while (index < remain.length) {
    topicLength = remain.readUInt16BE(index)
    packet
      .topics
      .push({
        name: remain.slice(index + 2, index + 2 + topicLength).toString(),
        QoS: remain[index + 2 + topicLength]
      })
    index += 3 + topicLength
  }
  return packet
}
