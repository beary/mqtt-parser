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
  export interface ConnAck extends BasePacket {
    connackAcknowledgeFlags: number
    connectReturnCode: number
  }
  export interface Publish extends BasePacket {
    flagOpt: {
      DUP: number
      QoS: number
      RETAIN: number
    }
    topicName: string
    packetId: number
    payload: Buffer
  }
  export interface PubAck extends BasePacket {
    packetId: number
  }
  export interface PubRec extends BasePacket {
    packetId: number
  }
  export interface PubRel extends BasePacket {
    packetId: number
  }
  export interface PubComp extends BasePacket {
    packetId: number
  }
  export interface Subscribe extends BasePacket {
    packetId: number
    topics: {
      name: string
      QoS: number
    }[]
  }
  export interface SubAck extends BasePacket {
    packetId: number
    codes: number[]
  }
  export interface Unsubscribe extends BasePacket {
    packetId: number
    topics: string[]
  }
  export interface UnsubAck extends BasePacket {
    packetId: number
  }
  export interface PingReq extends BasePacket { }
  export interface PingResp extends BasePacket { }
  export interface Disconnect extends BasePacket { }
}
