import React from "react"
import { Box } from "@chakra-ui/react"
import LeftArrow from "assets/LeftArrow"
import RightArrow from "assets/RightArrow"

type Props = {
  next: () => void
  prev: () => void
  currentPage: number
  maxPage: number
}

const Pagination = ({ next, prev, currentPage, maxPage }: Props) => {
  return (
    <Box display="flex" gap={3} justifyContent="center" p={4} pt={2}>
      <LeftArrow disabled={currentPage === 1} onClick={prev} />
      Page {currentPage} of {maxPage}
      <RightArrow disabled={currentPage === maxPage} onClick={next} />
    </Box>
  )
}

export default Pagination
