import { getExplorerLink } from "@solana-developers/helpers"
import {
  Cluster,
  Connection,
  Keypair,
  SystemProgram,
  TransactionMessage,
  TransactionMessageArgs,
  TransferParams,
  VersionedTransaction,
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

  const { blockhash } = await connection.getLatestBlockhash()

  const messageArgs: TransactionMessageArgs = {
    payerKey: senderKeypair.publicKey,
    recentBlockhash: blockhash,
    instructions: [sendSolInstruction],
  }

  const messageV0 = new TransactionMessage(messageArgs).compileToV0Message()

  const versionedTx = new VersionedTransaction(messageV0)
  versionedTx.sign([senderKeypair])

  const response = await connection.sendTransaction(versionedTx, {
    preflightCommitment: "confirmed",
  })

  console.log(getExplorerLink("transaction", response, cluster))

  return response
}
