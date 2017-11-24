# MQTT-parser
Split and parse MQTT packet from buffer.
> MQTT protocol document:
EN: http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
ZH: https://mcxiaoke.gitbooks.io/mqtt-cn/content/

---
## Usage
```javascript
/* javascript */
const mqttParser = require('mqtt-parser')
const connectBuffer = Buffer.from([
16, 56, // Header
0, 4, // Protocol ID length
77, 81, 84, 84, // Protocol ID
3, // Protocol version
246, // Connect flags
0, 30, // Keepalive
0, 5, // Client ID length
104, 101, 108, 108, 111, // Client ID
0, 6, // Will topic length
228, 189, 160, 229, 165, 189, // Will topic
0, 8, // Will payload length
112, 97, 121, 108, 111, 97, 100, 126, // Will payload
0, 8, // Username length
117, 115, 101, 114, 110, 97, 109, 101, // Username
0, 9, // Password length
112, 52, 36, 36, 119, 48, 194, 163, 100 // Password
])
let packets = mqttParser.parse(connectBuffer)
console.log(packets[0])
/*
{ packetType: 1,
flags: 0,
remainLength: 56,
buffer: <Buffer 10 38 00 04 4d 51 54 54 03 f6 00 1e 00 05 68 65 6c 6c 6f 00 06 e4 bd a0 e5 a5 bd 00 08 70 61 79 6c 6f 61 64 7e 00 08 75 73 65 72 6e 616d 65 00 09 70 ... >,
protocolName: 'MQTT',
protocolLevel: 3,
connectFlags:
{ username: 1,
password: 1,
willRetain: 1,
willQoS: 2,
willFlag: 1,
cleanSession: 1,
reserved: 0 },
keepAlive: 30,
clientId: 'hello',
willTopic: '你好',
willMessage: 'payload~',
username: 'username',
password: 'p4$$w0£d' }
*/

packets = mqttParser.parse(Buffer.concat([connectBuffer, connectBuffer, ...otherTypesPacket]))
console.log(packets)
/*
[{ packetType: 1, ... },
{ packetType: 1, ... },
...]
*/
```
```typescript
/* typescript */
import { parse, PacketType, Packet } from 'mqtt-parser'
const packets = mqttParser.parse(Buffer.from(connectBuffer)) // packets: BasePacket[]
if (packets[0].packetType === PacketType.CONNECT) {
let packet = packet[0] as Packet.Connect
packet.willTopic // code complete
}
```
---
## API
### parse(buffer: Buffer): BasePacket[]
