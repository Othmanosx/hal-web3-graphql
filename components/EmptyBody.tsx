import { Tr, Td, Text } from "@chakra-ui/react"
import React from "react"

type Props = {
  headings: string[]
  type: string
}

const EmptyBody = ({ headings, type }: Props) => {
  return (
    <Tr>
      <Td colSpan={headings.length}>
        <Text p={5} textAlign="center" fontSize="lg">
          No {type} found!
        </Text>
      </Td>
    </Tr>
  )
}

export default EmptyBody
