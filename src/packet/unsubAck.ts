import { Packet } from '.'

export const parse = (remain: Buffer, packet: Packet.UnsubAck) => {
  packet.packetId = remain.readUInt16BE(0)
  return packet
}
