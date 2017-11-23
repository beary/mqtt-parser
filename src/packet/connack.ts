import { Packet } from '.'

export const enum Code {
  ACCEPTED,
  UNACCEPTABLE_PROTOCOL_VERSION,
  IDENTIFIER_REJECTED,
  SERVER_UNAVAILABLE,
  BAD_USERNAME_OR_PASSWORD,
  NOT_AUTHORIZED
}

export const parse = (remain: Buffer, packet: Packet.ConnAck) => {
  let index = 0
  packet.connackAcknowledgeFlags = remain[index++]
  if (packet.connackAcknowledgeFlags > 1)
    throw new Error('"Connect Acknowledge Flags" Bits 7-1 are reserved and MUST be set to 0.')

  packet.connectReturnCode = remain[index++]
  if (packet.connectReturnCode > 5)
    throw new Error('Reserved connect return code.')

  if (remain.length > index)
    throw new Error('The CONNACK Packet has no payload.')
  return packet
}
