import { Pool } from "types"

export const getPoolName = (pool: Pool) => {
  const name0 = pool.token0.name === "NFT" ? "NFT" : pool.token0.symbol
  const name1 = pool.token1.name === "NFT" ? "NFT" : pool.token1.symbol
  return `${name0}/${name1}`
}
