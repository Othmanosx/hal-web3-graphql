import "styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, Container } from "@chakra-ui/react"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import theme from "theme"

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
    cache: new InMemoryCache(),
  })
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Container maxW="container.lg">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
