import { Box, Heading, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useQuery } from "@apollo/client"
import Table from "../../components/Table"
import { Pool } from "types"
import usePagination from "utils/usePagination"
import Pagination from "../../components/Pagination"
import LoadingTable from "../../components/LoadingTable"
import { GET_POOLS } from "graphqlQueries"
import EmptyBody from "components/EmptyBody"
import AllPoolsBody from "./PoolsBody"

const AllPools: NextPage = () => {
  const { loading, error, data } = useQuery(GET_POOLS)
  const { next, prev, currentData, currentPage, maxPage } = usePagination<Pool>(
    data?.pools || [],
    10
  )
  const headings = ["#", "Pool", "TX Count", "TVL (USD)", "Volume (USD)"]
  const isEmptyList = (currentData?.length === 0 && !loading) || error

  return (
    <Box mb={10}>
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
          {isEmptyList && <EmptyBody headings={headings} type={"pools"} />}
          <AllPoolsBody currentData={currentData} />
        </Tbody>
      </Table>
    </Box>
  )
}

export default AllPools
