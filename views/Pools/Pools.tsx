import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Button, useColorMode } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import React from "react"
import AllPools from "./AllPools"

const Watchlist = dynamic(() => import("./WatchList"), {
  ssr: false,
})

type Props = {}

const Pools = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <header>
        <Button
          display="flex"
          m="auto"
          variant="ghost"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </header>
      <Watchlist />
      <AllPools />
    </>
  )
}

export default Pools
