import { Tr, Td, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { Pool } from "types"
import formatNumber from "utils/formatNumber"
import { getPoolName } from "utils/getPoolName"

type Props = {
  currentData: Pool[]
}

const PoolsBody = ({ currentData }: Props) => {
  return (
    <>
      {currentData?.map((pool, index: number) => (
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
    </>
  )
}

export default PoolsBody
