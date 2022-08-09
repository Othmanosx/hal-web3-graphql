import { Heading, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useQuery, gql } from "@apollo/client"
import Table from "./Table"
import { Pool } from "types"
import { getPoolName } from "utils/getPoolName"
import usePagination from "utils/usePagination"
import Pagination from "./Pagination"
import LoadingTable from "./LoadingTable"
import formatNumber from "utils/formatNumber"

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

  if (error) return <p>Error :(</p>
  return (
    <>
      <Heading as="h2" size="md" mt={10} mb={4}>
        All Pools
      </Heading>
      <Table
        headings={headings}
        renderPagination={() => (
          <Pagination
            next={next}
            prev={prev}
            currentPage={currentPage}
            maxPage={maxPage}
          />
        )}
      >
        <Tbody>
          {loading && <LoadingTable />}
          {currentData.map((pool, index: number) => (
            <Tr key={pool.id}>
              <Td>{index + 1}</Td>
              <Td>
                <Text noOfLines={1} maxWidth={200}>
                  {getPoolName(pool)}
                </Text>
              </Td>
              <Td>{formatNumber(pool.txCount)}</Td>
              <Td>${formatNumber(pool.totalValueLockedUSD)}</Td>
              <Td>${formatNumber(pool.volumeUSD)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default Home
