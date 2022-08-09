import { Heading, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useQuery } from "@apollo/client"
import Table from "./Table"
import { Pool } from "types"
import { getPoolName } from "utils/getPoolName"
import usePagination from "utils/usePagination"
import Pagination from "./Pagination"
import LoadingTable from "./LoadingTable"
import formatNumber from "utils/formatNumber"
import Link from "next/link"
import { GET_POOLS } from "graphqlQueries"

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_POOLS)
  const { next, prev, currentData, currentPage, maxPage } = usePagination<Pool>(
    data?.pools || [],
    10
  )
  const headings = ["#", "Pool", "TX Count", "TVL (USD)", "Volume (USD)"]
  const isEmptyList = (currentData.length === 0 && !loading) || error

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
          {isEmptyList && (
            <Tr>
              <Td colSpan={headings.length}>
                <Text p={5} textAlign="center" fontSize="lg">
                  No pools found!
                </Text>
              </Td>
            </Tr>
          )}
          {currentData.map((pool, index: number) => (
            <Link key={pool.id} href={`/pools/${pool.id}`}>
              <Tr>
                <Td>{index + 1}</Td>
                <Td>
                  <Text
                    title={getPoolName(pool)}
                    sx={{ display: "block" }}
                    noOfLines={1}
                    maxWidth={100}
                  >
                    {getPoolName(pool)}
                  </Text>
                </Td>
                <Td>{formatNumber(pool.txCount)}</Td>
                <Td>${formatNumber(pool.totalValueLockedUSD)}</Td>
                <Td>${formatNumber(pool.volumeUSD)}</Td>
              </Tr>
            </Link>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default Home
