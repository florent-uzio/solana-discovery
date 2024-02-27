import { getExplorerLink } from "@solana-developers/helpers"
import {
  Connection,
  Keypair,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js"

type GenerateAccountProps = {
  senderKeypair: Keypair
  connection: Connection
}

export const genAndEnableAccount = async ({ connection, senderKeypair }: GenerateAccountProps) => {
  const keypair = Keypair.generate()
  console.log(keypair.secretKey)

  // To simply create the account
  const space = 0

  const lamports = await connection.getMinimumBalanceForRentExemption(space)

  // Creating the instruction
  const instruction = SystemProgram.createAccount({
    fromPubkey: senderKeypair.publicKey,
    /** Public key of the created account */
    newAccountPubkey: keypair.publicKey,
    /** Amount of lamports to transfer to the created account */
    lamports,
    /** Amount of space in bytes to allocate to the created account */
    space,
    /** Public key of the program to assign as the owner of the created account */
    programId: SystemProgram.programId,
  })

  const { blockhash } = await connection.getLatestBlockhash()

  const message = new TransactionMessage({
    payerKey: senderKeypair.publicKey,
    recentBlockhash: blockhash,
    instructions: [instruction],
  }).compileToV0Message()

  const tx = new VersionedTransaction(message)

  tx.sign([senderKeypair, keypair])

  const sig = await connection.sendTransaction(tx)

  console.log(getExplorerLink("transaction", sig, "devnet"))

  return keypair
}
