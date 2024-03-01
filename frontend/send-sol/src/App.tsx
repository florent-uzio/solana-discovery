import { ChakraProvider, Flex } from "@chakra-ui/react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from "react"
import { Banner, SendSolForm } from "./components"
import { Balance } from "./components/balance"
import("@solana/wallet-adapter-react-ui/styles.css")

function App() {
  const endpoint = clusterApiUrl("devnet")
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  return (
    <ChakraProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <Flex direction="column" alignItems="center" mx="32" gap="4">
              <Flex
                alignItems="center"
                justifyContent="space-between"
                py="4"
                borderBottom="1px gray solid"
                w="100%"
              >
                <Banner />
              </Flex>

              <Balance />
              <SendSolForm />
            </Flex>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ChakraProvider>
  )
}

export default App
