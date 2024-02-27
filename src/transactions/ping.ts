import { getExplorerLink } from "@solana-developers/helpers"
import {
  Cluster,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js"

const PING_PROGRAM_ADDRESS = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PING_PROGRAM_DATA_ADDRESS = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")

const transaction = new Transaction()
const programId = new PublicKey(PING_PROGRAM_ADDRESS)
const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS)

type PingProps = {
  connection: Connection
  signer: Keypair
  cluster?: Cluster
}

export const ping = async ({ cluster = "devnet", connection, signer }: PingProps) => {
  const transaction = new Transaction()

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: pingProgramDataId,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
  })

  transaction.add(instruction)

  const signature = await sendAndConfirmTransaction(connection, transaction, [signer])

  console.log(getExplorerLink("transaction", signature, cluster))

  return signature
}
