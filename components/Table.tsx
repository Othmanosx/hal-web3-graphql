import React from "react"
import { TableContainer, Thead, Tr, Th, Table } from "@chakra-ui/react"

type Props = {
  headings: string[]
  children: React.ReactNode
}

const TableComponent = ({ headings, children }: Props) => {
  return (
    <TableContainer p={2}>
      <Table variant="simple">
        <Thead>
          <Tr>
            {headings.map((heading) => (
              <Th key={heading}>{heading}</Th>
            ))}
          </Tr>
        </Thead>
        {children}
      </Table>
    </TableContainer>
  )
}

export default TableComponent
