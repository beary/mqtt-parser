import { getLen } from './util'
import { PacketType } from './packet'
import { Packet, Parse } from './packet'

// Parse.connect

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
    // break
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

const buf = Buffer.from([
  16, 57, // Header
  0, 6, // Protocol ID length
  77, 81, 73, 115, 100, 112, // Protocol ID
  3, // Protocol version
  246, // Connect flags
  0, 30, // Keepalive
  0, 4, // Client ID length
  116, 101, 36, 116, // Client ID
  0, 6, // Will topic length
  116, 195, 178, 112, 105, 99, // Will topic
  0, 8, // Will payload length
  112, 97, 121, 194, 163, 111, 97, 100, // Will payload
  0, 8, // Username length
  117, 36, 101, 114, 110, 52, 109, 101, // Username
  0, 9, // Password length
  112, 52, 36, 36, 119, 48, 194, 163, 100 // Password
])

for (const b of parse(buf)) {
  delete b.buffer
  console.log(b)
}
