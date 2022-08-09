import { gql } from "@apollo/client"

export const GET_POOLS = gql`
  query GetPools {
    pools {
      id
      txCount
      totalValueLockedUSD
      volumeUSD
      token0 {
        id
        name
        symbol
      }
      token1 {
        id
        name
        symbol
      }
    }
  }
`
export const POOL_QUERY = gql`
  query GetPool($id: ID!) {
    pool(id: $id) {
      id
      totalValueLockedUSD
      txCount
      volumeUSD
      token0 {
        id
        name
        symbol
        txCount
        totalValueLockedUSD
      }
      token1 {
        id
        name
        symbol
        txCount
        totalValueLockedUSD
      }
      burns {
        id
        timestamp
        transaction {
          id
        }
        __typename
        amountUSD
      }
      mints {
        id
        timestamp
        transaction {
          id
        }
        __typename
        origin
        amountUSD
      }
      swaps {
        id
        timestamp
        transaction {
          id
        }
        __typename
        origin
        amountUSD
      }
    }
  }
`
