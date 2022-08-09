import React, { useState } from "react"
import { useRouter } from "next/router"
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Skeleton,
  Tbody,
  Td,
  Tr,
  Text,
  Select,
} from "@chakra-ui/react"
import Table from "components/Table"
import InfoCard from "components/InfoCard"
import { useQuery } from "@apollo/client"
import { Pool, PoolDetails, Transaction } from "types"
import { ChevronLeftIcon, StarIcon } from "@chakra-ui/icons"
import LoadingTable from "components/LoadingTable"
import Pagination from "components/Pagination"
import formatNumber from "utils/formatNumber"
import usePagination from "utils/usePagination"
import getRelativeTime from "utils/getRelativeTime"
import { POOL_QUERY } from "graphqlQueries"
import useLocalStorage from "utils/useLocalStorage"

const PoolItem = () => {
  const router = useRouter()
  const [type, setType] = useState("swaps")
  const [watchList, setWatchList] = useLocalStorage("watchList", [])
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
  const isEmptyList = (currentData.length === 0 && !loading) || error

  const isInWatchList = watchList.includes(id as string)
  const handleWatchList = (pool: PoolDetails) => {
    // remove item from watchlist if already in watchlist
    if (watchList.includes(pool.id)) {
      setWatchList(watchList.filter((item: Pool) => item.id !== pool.id))
      return
    }
    // add item to watchlist if not in watchlist
    const { id, txCount, totalValueLockedUSD, volumeUSD, token0, token1 } = pool
    const newWatchList = [
      ...watchList,
      {
        id,
        txCount,
        totalValueLockedUSD,
        volumeUSD,
        token0,
        token1,
      },
    ]
    setWatchList(newWatchList)
  }
  return (
    <Box my={10}>
      <Button
        colorScheme="blue"
        leftIcon={<ChevronLeftIcon fontSize={24} />}
        onClick={() => router.back()}
        variant="outline"
      >
        Back to Pools
      </Button>
      <Flex my={5} justifyContent="space-between">
        <Skeleton isLoaded={!loading} minWidth="150px">
          <Heading>
            {pool?.token0?.symbol}/{pool?.token1?.symbol}
          </Heading>
        </Skeleton>
        <Button
          variant={isInWatchList ? "solid" : "outline"}
          onClick={() => handleWatchList(pool)}
          colorScheme={isInWatchList ? "red" : "blue"}
          leftIcon={<StarIcon />}
        >
          {isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
      </Flex>
      <InfoCard pool={pool} />
      <Flex mt={10} mb={4} gap={5} alignItems="center">
        <Heading as="h2" size="md">
          Transactions
        </Heading>
        <div>
          <Select onChange={selectType} size="md">
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
            <Tr>
              <Td colSpan={headings.length}>
                <Text p={5} textAlign="center" fontSize="lg">
                  No transactions found!
                </Text>
              </Td>
            </Tr>
          )}
          {currentData.map((pool, index: number) => (
            <Tr key={pool.id}>
              <Td>{index + 1}</Td>
              <Td>
                <Link
                  href={`https://etherscan.io/tx/${pool.transaction?.id}`}
                  target="_blank"
                >
                  <Text sx={{ display: "block" }} noOfLines={1} width={200}>
                    {`https://etherscan.io/tx/${pool.transaction?.id}`}
                  </Text>
                </Link>
              </Td>
              <Td>{pool.__typename}</Td>
              <Td>${formatNumber(pool.amountUSD)}</Td>
              <Td>{getRelativeTime(pool.timestamp)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default PoolItem
