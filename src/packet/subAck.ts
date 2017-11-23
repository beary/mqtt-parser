import { Packet } from '.'

export const parse = (remain: Buffer, packet: Packet.SubAck) => {
  let index = 0
  packet.packetId = remain.readUInt16BE(index)
  index += 2
  packet.codes = [].concat(...remain.slice(index))
  return packet
}
