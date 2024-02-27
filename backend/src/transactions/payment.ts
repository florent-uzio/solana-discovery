import { getExplorerLink } from "@solana-developers/helpers"
import {
  Cluster,
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  TransferParams,
  sendAndConfirmTransaction,
} from "@solana/web3.js"

type SendPaymentProps = {
  transferParams: Omit<TransferParams, "fromPubkey">
  senderKeypair: Keypair
  connection: Connection
  cluster?: Cluster
}

export const sendPayment = async ({
  transferParams,
  senderKeypair,
  connection,
  cluster = "devnet",
}: SendPaymentProps) => {
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    ...transferParams,
  })

  const transaction = new Transaction()
  transaction.add(sendSolInstruction)

  const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair])

  console.log(getExplorerLink("transaction", signature, cluster))

  return signature
}
