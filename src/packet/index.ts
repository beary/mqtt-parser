export { parse as connect } from './connect'

export const enum PacketType {
  CONNECT = 1,
  CONNACK,
  PUBLISH,
  PUBACK,
  PUBREC,
  PUBREL,
  PUBCOMP,
  SUBSCRIBE,
  SUBACK,
  UNSUBSCRIBE,
  UNSUBACK,
  PINGREQ,
  PINGRESP,
  DISCONNECT
}

export namespace Packet {
  export interface BasePacket {
    packetType: number
    flags: number
    remainLength: number
    buffer: Buffer
  }
  export interface Connect extends BasePacket {
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
    clientId?: string
  }
}
