import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react"
import React from "react"
import { PoolDetails } from "types"
import formatNumber from "utils/formatNumber"

type Props = {
  pool: PoolDetails
}

const InfoCard = ({ pool }: Props) => {
  return (
    <TableContainer
      bg="gray.900"
      borderWidth="1px"
      borderRadius="lg"
      maxWidth="450px"
    >
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th fontSize={16}>Tokens Value (USD)</Th>
            <Th fontSize={16}>TX Count</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{pool?.token0?.symbol}</Td>
            <Td>{formatNumber(pool?.token0?.totalValueLockedUSD)}</Td>
          </Tr>
          <Tr>
            <Td>{pool?.token1?.symbol}</Td>
            <Td>{formatNumber(pool?.token1?.totalValueLockedUSD)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default InfoCard
