export interface Pool {
  id: string
  txCount: string
  totalValueLockedUSD: string
  volumeUSD: string
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

export type Transaction = {
  id: string
  timestamp: string
  transaction: {
    id: string
  }
  __typename: string
  origin: string
  amountUSD: string
}
export interface PoolDetails {
  id: string
  totalValueLockedUSD: string
  txCount: string
  volumeUSD: string
  token0: {
    id: string
    name: string
    symbol: string
    txCount: string
    totalValueLockedUSD: string
  }
  token1: {
    id: string
    name: string
    symbol: string
    txCount: string
    totalValueLockedUSD: string
  }
  burns: Transaction[]
  mints: Transaction[]
  swaps: Transaction[]
}
