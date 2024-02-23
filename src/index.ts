import { getKeypairFromEnvironment } from "@solana-developers/helpers"
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js"
import "dotenv/config"
import { sendPayment } from "./transactions"

const main = async () => {
  const keypair = getKeypairFromEnvironment("SECRET_KEY")
  const keypair2 = Keypair.generate()
  console.log(keypair2.secretKey)

  console.log(`Public Key: ${keypair.publicKey.toBase58()}`)
  console.log(`Public Key 2: ${keypair2.publicKey.toBase58()}`)

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
  const bal1 = await connection.getBalance(keypair.publicKey)
  console.log(bal1)
  await sendPayment({
    transferParams: {
      toPubkey: keypair2.publicKey,
      lamports: 1250000,
    },
    connection,
    senderKeypair: keypair,
  })
}

main()
