import { getKeypairFromEnvironment } from "@solana-developers/helpers"
import { Connection, clusterApiUrl } from "@solana/web3.js"
import "dotenv/config"
import { ping } from "./transactions/ping"

const main = async () => {
  const keypair = getKeypairFromEnvironment("SECRET_KEY")
  const keypair2 = getKeypairFromEnvironment("SECRET_KEY_2")
  // console.log(keypair.publicKey.toBase58())
  // const keypair2 = Keypair.generate()
  // console.log(keypair2.publicKey.toBase58())

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
  // const bal = await connection.getBalance(keypair.publicKey)
  // console.log({ balance: bal / LAMPORTS_PER_SOL })
  // await generateAccount({ connection, senderKeypair: keypair })

  // console.log(`Public Key: ${keypair.publicKey.toBase58()}`)
  // console.log(`Public Key 2: ${keypair2.publicKey.toBase58()}`)

  // await sendPayment({
  //   transferParams: {
  //     toPubkey: keypair2.publicKey,
  //     lamports: 1,
  //   },
  //   connection,
  //   senderKeypair: keypair,
  // })

  await ping({ connection, signer: keypair })
}

main()
