import { getLen } from './util'
import { PacketType } from './packet'
import { Packet, Parse } from './packet'

// Parse.connect
/*
export interface OldPacket {
  packetType: number
  flags: number
  remainLength: number
  buffer: Buffer
  // Connect Variable Header
  protocolName?: string
  protocolLevel?: number
  connectFlags?: {
    username: number
    password: number
    willRetain: number
    willQoS: number
    willFlag: number
    cleanSession: number
    reserved: number
  }
  keepAlive?: number
  clientID?: string
}
*/

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
      return Parse.connack(remain, packet as Packet.Connack)
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
