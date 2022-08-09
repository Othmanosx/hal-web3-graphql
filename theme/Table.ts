import { tableAnatomy as parts } from "@chakra-ui/anatomy"
import { mode } from "@chakra-ui/theme-tools"
import type { PartsStyleFunction } from "@chakra-ui/styled-system"

const variantSimple: PartsStyleFunction<typeof parts> = (props) => {
  return {
    tbody: {
      tr: {
        cursor: "pointer",
        "&:hover": {
          bg: mode("gray.100", "gray.800")(props),
        },
      },
    },
  }
}

const variants = {
  simple: variantSimple,
}

const Table = {
  parts: parts.keys,
  variants,
}

export default Table
