import { Packet } from '../packet'

export default (remain: Buffer, packet: Packet.PubAck) => {
  packet.packetId = remain.readUInt16BE(0)
  return packet
}
