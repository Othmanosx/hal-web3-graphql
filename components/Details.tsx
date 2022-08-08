import { Flex } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useQuery, gql } from "@apollo/client"

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    burns {
      id
      timestamp
      transaction {
        id
      }
      pool {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      __typename
      origin
      amountUSD
    }
    mints {
      id
      timestamp
      transaction {
        id
      }
      pool {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
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
      pool {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      __typename
      origin
      amountUSD
    }
  }
`

const Details: NextPage = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const allTrans = [...data.burns, ...data.mints, ...data.swaps]

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <div>
        {allTrans.map((trans) => (
          <div key={trans.id}>
            {trans.pool.token0.symbol}/{trans.pool.token1.symbol}
            <div>{trans.txCount}</div>
            <div>{trans.totalValueLockedUSD}</div>
            <div>{trans.volumeUSD}</div>
            <br />
          </div>
        ))}
      </div>
    </Flex>
  )
}

export default Details
