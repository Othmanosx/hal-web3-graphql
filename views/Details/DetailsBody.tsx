import { Tr, Td, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { Transaction } from "types"
import formatNumber from "utils/formatNumber"
import getRelativeTime from "utils/getRelativeTime"

type Props = {
  currentData: Transaction[]
}

const DetailsBody = ({ currentData }: Props) => {
  return (
    <>
      {currentData?.map((pool, index: number) => (
        <Link
          key={pool.id}
          href={`https://etherscan.io/tx/${pool.transaction?.id}`}
          target="_blank"
        >
          <Tr>
            <Td>{index + 1}</Td>
            <Td>
              <Text
                as="u"
                color="blue.400"
                sx={{ display: "block" }}
                noOfLines={1}
                maxWidth={400}
              >
                {`https://etherscan.io/tx/${pool.transaction?.id}`}
              </Text>
            </Td>
            <Td>{pool.__typename}</Td>
            <Td>${formatNumber(pool.amountUSD)}</Td>
            <Td>{getRelativeTime(pool.timestamp)}</Td>
          </Tr>
        </Link>
      ))}
    </>
  )
}

export default DetailsBody
