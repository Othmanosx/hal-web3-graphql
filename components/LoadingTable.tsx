import { Tr, Td, Skeleton } from "@chakra-ui/react"
import React from "react"

const LoadingTable = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
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
