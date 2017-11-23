import { getLen } from './util'
import { PacketType } from './packet'
import { Packet, Parse } from './packet'

const buildPacket = (buffer: Buffer, remainLength: number, bytesNum: number) => {
  const remain = buffer.slice(1 + bytesNum)
  const packet = {
    packetType: buffer[0] >> 4 & 0x0F,
    flags: buffer[0] & 0x0F,
    remainLength,
    buffer
  }
  switch (packet.packetType) {
    case PacketType.CONNECT:
      return Parse.connect(remain, packet as Packet.Connect)
    case PacketType.CONNACK:
      return Parse.connack(remain, packet as Packet.ConnAck)
    case PacketType.PUBLISH:
      return Parse.publish(remain, packet as Packet.Publish)
    case PacketType.PUBACK:
      return Parse.pubAck(remain, packet as Packet.PubAck)
    case PacketType.PUBREC:
      return Parse.pubRec(remain, packet as Packet.PubRec)
    case PacketType.SUBSCRIBE:
      return Parse.subscribe(remain, packet as Packet.Subscribe)
    case PacketType.SUBACK:
      return Parse.subAck(remain, packet as Packet.SubAck)
    case PacketType.UNSUBSCRIBE:
      return Parse.unsubscribe(remain, packet as Packet.Unsubscribe)
    case PacketType.UNSUBACK:
      return Parse.unsubAck(remain, packet as Packet.UnsubAck)
    case PacketType.PINGREQ:
      return packet as Packet.PingReq
    case PacketType.PINGRESP:
      return packet as Packet.PingResp
    case PacketType.DISCONNECT:
      return packet as Packet.Disconnect
  }
  // return packet
}


export const parse = function* (buffer: Buffer) {
  let packetLength = 0

  for (let start = 0; start < buffer.length; start += packetLength) {
    const { value, bytesNum } = getLen(buffer.slice(start))
    packetLength = 1 + bytesNum + value
    yield buildPacket(buffer.slice(start, packetLength), value, bytesNum)
    start += packetLength
    if (start > buffer.length)
      throw new Error('Imcomplete packet')
  }
}
