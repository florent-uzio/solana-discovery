import { Text } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"

export const Balance = () => {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (!connection || !publicKey) {
      return
    }

    connection.onAccountChange(
      publicKey,
      (updatedAcctInfo) => {
        console.log(updatedAcctInfo)
        setBalance(updatedAcctInfo.lamports / LAMPORTS_PER_SOL)
      },
      "confirmed",
    )

    connection
      .getBalance(publicKey)
      .then((bal) => {
        console.log(bal)
        setBalance(bal)
      })
      .catch((err) => console.error(err))
  }, [connection, publicKey])

  return <Text fontSize="3xl">{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL} SOL` : ""}</Text>
}
