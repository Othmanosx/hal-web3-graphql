export interface Pool {
  id: string
  txCount: number
  totalValueLockedUSD: number
  volumeUSD: number
  token0: {
    id: string
    name: string
    symbol: string
  }
  token1: {
    id: string
    name: string
    symbol: string
  }
}
