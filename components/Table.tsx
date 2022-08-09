import React from "react"
import { TableContainer, Thead, Tr, Th, Table, Box } from "@chakra-ui/react"

type Props = {
  headings: string[]
  children: React.ReactNode
  renderPagination: () => React.ReactNode
}

const TableComponent = ({ headings, children, renderPagination }: Props) => {
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <TableContainer p={2}>
        <Table>
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
      {renderPagination()}
    </Box>
  )
}

export default TableComponent
