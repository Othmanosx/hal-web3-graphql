import { useState, useEffect } from "react"
import { Pool } from "types"

const useLocalStorage = (key: string, defaultValue: Pool[]) => {
  const isClient = typeof window !== "undefined"

  const [value, setValue] = useState(() => {
    let currentValue

    try {
      currentValue = isClient
        ? JSON.parse(localStorage?.getItem(key) || String(defaultValue))
        : String(defaultValue)
    } catch (error) {
      currentValue = defaultValue
    }

    return currentValue
  })

  useEffect(() => {
    if (isClient) {
      localStorage?.setItem(key, JSON.stringify(value))
    }
  }, [value, key, isClient])

  return [value, setValue]
}

export default useLocalStorage
