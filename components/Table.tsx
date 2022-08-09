import React from "react"
import {
  TableContainer,
  Thead,
  Tr,
  Th,
  Table,
  Box,
  useColorModeValue,
} from "@chakra-ui/react"

type Props = {
  headings: string[]
  children: React.ReactNode
  renderPagination: () => React.ReactNode
}

const TableComponent = ({ headings, children, renderPagination }: Props) => {
  const bg = useColorModeValue("white", "gray.900")

  return (
    <Box borderWidth="1px" borderRadius="lg" bgColor={bg}>
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
