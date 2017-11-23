import { Packet } from '.'

export const parse = (remain: Buffer, packet: Packet.PubAck) => {
  packet.packetId = remain.readUInt16BE(0)
  return packet
}
