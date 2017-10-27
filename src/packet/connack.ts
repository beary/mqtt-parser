import { Packet } from '.'

const enum Code {
  ACCEPTED,
  UNACCEPTABLE_PROTOCOL_VERSION,
  IDENTIFIER_REJECTED,
  SERVER_UNAVAILABLE,
  BAD_USERNAME_OR_PASSWORD,
  NOT_AUTHORIZED
}

export const parse = (remain: Buffer, packet: Packet.Connack) => {
  let index = 0
  packet.connackAcknowledgeFlags = packet[index++]
  if (packet.connackAcknowledgeFlags > 1)
    throw new Error('"Connect Acknowledge Flags" Bits 7-1 are reserved and MUST be set to 0.')

  packet.connectReturnCode = packet[index]
  if (packet.connectReturnCode > 5)
    throw new Error('Reserved connect return code')
}
