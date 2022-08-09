import { useState } from "react"

interface ReturnedData<T> {
  next: () => void
  prev: () => void
  currentData: T[]
  currentPage: number
  maxPage: number
}

function usePagination<T>(data: T[], itemsPerPage: number): ReturnedData<T> {
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(data.length / itemsPerPage)

  const begin = (currentPage - 1) * itemsPerPage
  const end = begin + itemsPerPage
  const currentData = data.slice(begin, end)

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
  }

  return { next, prev, currentData, currentPage, maxPage }
}

export default usePagination
