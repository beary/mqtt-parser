import { parse as connect } from './connect'
import { parse as connack } from './connack'

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
    willTopic?: string
    willMessage?: string
    username?: string
    password?: string
  }
  export interface Connack extends BasePacket {
    connackAcknowledgeFlags: number
    connectReturnCode: number
  }
}

export const Parse = {
  connect,
  connack
}
