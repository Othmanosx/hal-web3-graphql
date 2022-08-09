import { Heading, Tbody } from "@chakra-ui/react"
import type { NextPage } from "next"
import Table from "../../components/Table"
import { Pool } from "types"
import usePagination from "utils/usePagination"
import Pagination from "../../components/Pagination"
import EmptyBody from "components/EmptyBody"
import AllPoolsBody from "./PoolsBody"
import useLocalStorage from "utils/useLocalStorage"

const Watchlist: NextPage = () => {
  const [watchList] = useLocalStorage("watchList", [])
  const { next, prev, currentData, currentPage, maxPage } = usePagination<Pool>(
    watchList || [],
    5
  )

  const headings = ["#", "Pool", "TX Count", "TVL (USD)", "Volume (USD)"]
  const isEmptyList = currentData?.length === 0

  return (
    <>
      <Heading as="h2" size="md" mt={10} mb={4}>
        Pool Watchlist
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
          {isEmptyList && <EmptyBody headings={headings} type={"pools"} />}
          <AllPoolsBody currentData={currentData} />
        </Tbody>
      </Table>
    </>
  )
}

export default Watchlist
