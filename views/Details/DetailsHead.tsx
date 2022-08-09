import { StarIcon } from "@chakra-ui/icons"
import { Flex, Skeleton, Heading, Button } from "@chakra-ui/react"
import React from "react"
import { Pool, PoolDetails } from "types"
import { getPoolName } from "utils/getPoolName"
import useLocalStorage from "utils/useLocalStorage"

type Props = {
  loading: boolean
  pool: PoolDetails
}

const DetailsHead = ({ loading, pool }: Props) => {
  const [watchList, setWatchList] = useLocalStorage("watchList", [])
  const isInWatchList =
    Array.isArray(watchList) &&
    watchList?.find((item: Pool) => item?.id === pool?.id)?.id

  const handleWatchList = (pool: PoolDetails) => {
    // remove item from watchlist if already in watchlist
    if (!pool) return
    if (isInWatchList) {
      setWatchList(watchList.filter((item: Pool) => item.id !== pool.id))
      return
    }
    // add item to watchlist if not in watchlist
    const newWatchList = [
      ...watchList,
      {
        id: pool?.id,
        txCount: pool?.txCount,
        totalValueLockedUSD: pool?.totalValueLockedUSD,
        volumeUSD: pool?.volumeUSD,
        token0: pool?.token0,
        token1: pool?.token1,
      },
    ]
    setWatchList(newWatchList)
  }
  return (
    <Flex my={5} gap={3} justifyContent="space-between" wrap="wrap">
      <Skeleton isLoaded={!loading} minWidth="150px">
        <Heading noOfLines={1}>{getPoolName(pool)}</Heading>
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <Button
          variant={isInWatchList ? "solid" : "outline"}
          onClick={() => handleWatchList(pool)}
          colorScheme={isInWatchList ? "red" : "blue"}
          leftIcon={<StarIcon />}
        >
          {isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
      </Skeleton>
    </Flex>
  )
}

export default DetailsHead
