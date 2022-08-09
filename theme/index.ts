import { extendTheme, type ThemeConfig } from "@chakra-ui/react"
import type { ComponentStyleConfig } from "@chakra-ui/theme"
import Table from "./Table"

const Tbody: ComponentStyleConfig = {
  baseStyle: {
    border: "10px solid #eaeaea",
  },
}

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  components: {
    Table,
  },
})

export default theme
