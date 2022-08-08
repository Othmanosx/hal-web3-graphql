import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import Pools from "../components/Pools"
import { Container } from "@chakra-ui/react"

const Home: NextPage = () => {
  return (
    <Container maxW="container.lg">
      <Pools />
    </Container>
  )
}

export default Home
