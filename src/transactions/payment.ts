import {
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
}

export const sendPayment = async ({
  transferParams,
  senderKeypair,
  connection,
}: SendPaymentProps) => {
  const transaction = new Transaction()

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    ...transferParams,
  })

  transaction.add(sendSolInstruction)

  const response = await sendAndConfirmTransaction(connection, transaction, [senderKeypair])

  console.log(response)

  return response
}
