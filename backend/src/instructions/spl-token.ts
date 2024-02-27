import {
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMintCloseAuthorityInstruction,
  createInitializeMintInstruction,
  getMintLen,
} from "@solana/spl-token"
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js"
;(async () => {
  const payer = Keypair.generate()

  const mintKeypair = Keypair.generate()
  const mintPublicKey = mintKeypair.publicKey
  const mintAuthority = Keypair.generate()
  const freezeAuthority = Keypair.generate()
  const closeAuthority = Keypair.generate()

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

  const airdropSignature = await connection.requestAirdrop(payer.publicKey, 2 * LAMPORTS_PER_SOL)
  await connection.confirmTransaction({
    signature: airdropSignature,
    ...(await connection.getLatestBlockhash()),
  })

  const extensions = [ExtensionType.MintCloseAuthority]
  const mintLen = getMintLen(extensions)
  const lamports = await connection.getMinimumBalanceForRentExemption(mintLen)

  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mintPublicKey,
      space: mintLen,
      lamports,
      programId: TOKEN_2022_PROGRAM_ID,
    }),
    createInitializeMintCloseAuthorityInstruction(
      mintPublicKey,
      closeAuthority.publicKey,
      TOKEN_2022_PROGRAM_ID,
    ),
    createInitializeMintInstruction(
      mintPublicKey,
      9,
      mintAuthority.publicKey,
      freezeAuthority.publicKey,
      TOKEN_2022_PROGRAM_ID,
    ),
  )
  await sendAndConfirmTransaction(connection, transaction, [payer, mintKeypair], undefined)
})()
