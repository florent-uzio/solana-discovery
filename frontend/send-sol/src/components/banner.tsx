import { Heading } from "@chakra-ui/react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export const Banner = () => {
  return (
    <>
      <Heading size="xl">Solana Send SOL</Heading>
      <WalletMultiButton />
    </>
  )
}
