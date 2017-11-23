import { Packet } from '.'

export const parse = (remain: Buffer, packet: Packet.PubRec) => {
  packet.packetId = remain.readUInt16BE(0)
  return packet
}
