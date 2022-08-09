import {
  Box,
  Heading,
  Spinner,
  Tbody,
  Td,
  Text,
  Tfoot,
  Tr,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import { useQuery, gql } from "@apollo/client"
import Table from "./Table"
import { Pool } from "types"
import { getPoolName } from "utils/getPoolName"
import usePagination from "utils/usePagination"
import Pagination from "./Pagination"

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
  const { next, prev, currentData, currentPage, maxPage } = usePagination<Pool>(
    data?.pools || [],
    10
  )
  const headings = ["#", "Pool", "TX Count", "TVL (USD)", "Volume (USD)"]

  if (loading) return <Spinner />
  if (error) return <p>Error :(</p>
  return (
    <>
      <Heading as="h2" mt={10} mb={2}>
        All Pools
      </Heading>
      <Box borderWidth="1px" borderRadius="lg">
        <Table headings={headings}>
          <Tbody>
            {currentData.map((pool, index: number) => (
              <Tr key={pool.id}>
                <Td>{index + 1}</Td>
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
        <Pagination
          next={next}
          prev={prev}
          currentPage={currentPage}
          maxPage={maxPage}
        />
      </Box>
    </>
  )
}

export default Home
