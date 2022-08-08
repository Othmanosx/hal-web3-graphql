import { Box, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useQuery, gql } from "@apollo/client"
import Table from "./Table"
import { Pool } from "types"
import { getPoolName } from "utils/getPoolName"

const GET_POOLS = gql`
  query GetPools {
    pools {
      id
      txCount
      totalValueLockedUSD
      volumeUSD
      token0 {
        id
        name
        symbol
      }
      token1 {
        id
        name
        symbol
      }
    }
  }
`

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_POOLS)
  const headings = ["Pool", "TX Count", "TVL (USD)", "Volume (USD)"]

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Table headings={headings}>
        <Tbody>
          {data.pools.map((pool: Pool) => (
            <Tr key={pool.id}>
              <Td>
                <Text noOfLines={1} maxWidth={200}>
                  {getPoolName(pool)}
                </Text>
              </Td>
              <Td>{pool.txCount}</Td>
              <Td>{pool.totalValueLockedUSD}</Td>
              <Td>{pool.volumeUSD}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default Home
