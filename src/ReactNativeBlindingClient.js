import { hexToBuffer } from '@celo/base/lib/address'
//import { BlsBlindingClient } from '@celo/identity/lib/odis/bls-blinding-client'
import crypto from 'crypto'
import { ec as EC } from 'elliptic'
import BlindThresholdBls from 'react-native-blind-threshold-bls'

const ec = new EC('secp256k1')

/**
 * Wraps the React Native BLS client
 */
export class ReactNativeBlsBlindingClient {

  constructor(odisPubKey, base64Random) {
    this.odisPubKey = odisPubKey
    this.base64Random = base64Random
  }

  blindMessageWithRandom = async (base64PhoneNumber) => {
    return (await BlindThresholdBls.blindMessageWithRandom(base64PhoneNumber, this.base64Random)).trim()
  } 

  blindMessage = async (base64PhoneNumber) => {
    return (await BlindThresholdBls.blindMessage(base64PhoneNumber)).trim()
  }

  unblindAndVerifyMessage(base64BlindSig){
    return BlindThresholdBls.unblindMessage(base64BlindSig, this.odisPubKey)
  }

  static generateDeterministicBlindingFactor(privateKeyHex, e164Number) {
    // Use signature with DEK as deterministic random blinding factor
    const key = ec.keyFromPrivate(hexToBuffer(privateKeyHex))
    const sig = JSON.stringify(key.sign(e164Number).toDER())
    const sigHash = crypto.createHash('sha256').update(sig).digest('base64')
    const byteBuffer = []
    const buffer = Buffer.from(sigHash, 'utf16le')
    for (let i = 0; i < 32; i++) {
      byteBuffer.push(buffer[i])
    }
    return Buffer.from(byteBuffer).toString('base64')
    
  }
}