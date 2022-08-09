import React, { useState } from "react"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Tbody, Select } from "@chakra-ui/react"
import Table from "components/Table"
import InfoCard from "components/InfoCard"
import { useQuery } from "@apollo/client"
import { PoolDetails, Transaction } from "types"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import LoadingTable from "components/LoadingTable"
import Pagination from "components/Pagination"
import usePagination from "utils/usePagination"
import { POOL_QUERY } from "graphqlQueries"
import EmptyBody from "components/EmptyBody"
import DetailsHead from "./DetailsHead"
import DetailsBody from "./DetailsBody"

const Details = () => {
  const router = useRouter()
  const [type, setType] = useState("all")

  const { id } = router.query
  const { loading, error, data } = useQuery(POOL_QUERY, {
    variables: {
      id: id as string,
    },
  })

  const pool: PoolDetails = data?.pool

  function getTransactions() {
    if (loading || error) return []
    if (type === "burns") return pool.burns
    if (type === "mints") return pool.mints
    if (type === "swaps") return pool.swaps
    if (type === "all") return [...pool.burns, ...pool.mints, ...pool.swaps]
    return []
  }
  const { next, prev, setPage, currentData, currentPage, maxPage } =
    usePagination<Transaction>(getTransactions(), 10)
  const headings = [
    "#",
    "Link to Etherscan",
    "TX Type",
    "Token Amount (USD)",
    "Timestamp",
  ]
  const selectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1)
    setType(e.target.value)
  }
  const isEmptyList = (currentData?.length === 0 && !loading) || error

  return (
    <Box my={10}>
      <Button
        colorScheme="blue"
        leftIcon={<ChevronLeftIcon fontSize={24} />}
        onClick={() => router.back()}
        variant="link"
      >
        Back to Pools
      </Button>
      <DetailsHead loading={loading} pool={pool} />
      <InfoCard pool={pool} />
      <Flex mt={10} mb={4} gap={5} alignItems="center">
        <Heading as="h2" size="md">
          Transactions
        </Heading>
        <div>
          <Select value={type} onChange={selectType} size="md">
            <option value="all">All</option>
            <option value="swaps">Swaps</option>
            <option value="burns">Burns</option>
            <option value="mints">Mints</option>
          </Select>
        </div>
      </Flex>
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
            <EmptyBody headings={headings} type={"transactions"} />
          )}
          <DetailsBody currentData={currentData} />
        </Tbody>
      </Table>
    </Box>
  )
}

export default Details
