import { Packet } from '../packet'

export default (remain: Buffer, packet: Packet.Unsubscribe) => {
  let index = 0
  packet.packetId = remain.readUInt16BE(index)
  index += 2

  packet.topics = []
  let topicLength: number
  while (index < remain.length) {
    topicLength = remain.readUInt16BE(index)
    packet.topics
      .push(
      remain
        .slice(index + 2, index + 2 + topicLength).toString()
      )
    index += 2 + topicLength
  }
  return packet
}
