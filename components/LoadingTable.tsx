import { Tr, Td, Skeleton } from "@chakra-ui/react"
import React from "react"

type Props = {}

const LoadingTable = (props: Props) => {
  return (
    <>
      {[...new Array(5)].map((item) => (
        <Tr key={item}>
          <Td>
            <Skeleton height="20px" />
          </Td>
          <Td>
            <Skeleton height="20px" />
          </Td>
          <Td>
            <Skeleton height="20px" />
          </Td>
          <Td>
            <Skeleton height="20px" />
          </Td>
          <Td>
            <Skeleton height="20px" />
          </Td>
        </Tr>
      ))}
    </>
  )
}

export default LoadingTable
