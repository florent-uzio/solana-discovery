import { Button, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
  amount: number
  destination: string
}

export const SendSolForm = () => {
  const { register, handleSubmit } = useForm<Inputs>()
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()

  const onSubmitHandler: SubmitHandler<Inputs> = async ({ amount, destination }) => {
    alert(JSON.stringify({ amount, destination }, null, 2))

    if (!publicKey) {
      return
    }

    const transaction = new Transaction()
    const recipientPubKey = new PublicKey(destination)

    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: LAMPORTS_PER_SOL * amount,
    })

    transaction.add(sendSolInstruction)

    const sig = await sendTransaction(transaction, connection)
    console.log("Signature: ", sig)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormControl>
        <FormLabel>Amount</FormLabel>
        <Input minW="400px" {...register("amount")} />
        <FormHelperText>Amount of SOL to send</FormHelperText>
      </FormControl>

      <FormControl my="5">
        <FormLabel>Destination</FormLabel>
        <Input minW="500px" {...register("destination")} />
        <FormHelperText>Solana Destination Address</FormHelperText>
      </FormControl>

      <Button type="submit" colorScheme="blue" ml="100%">
        Send
      </Button>
    </form>
  )
}
