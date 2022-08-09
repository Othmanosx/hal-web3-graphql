import BigNumber from "bignumber.js"

export default function formatNumber(
  num: string = "0",
  decimals: number = 2
): string {
  const bigNumber = new BigNumber(num)
  if (bigNumber.gte(1000000000000)) {
    return bigNumber.div(1000000000000).decimalPlaces(decimals).toString() + "t"
  }
  if (bigNumber.gte(1000000000)) {
    return bigNumber.div(1000000000).decimalPlaces(decimals).toString() + "b"
  }
  if (bigNumber.gte(1000000)) {
    return bigNumber.div(1000000).decimalPlaces(decimals).toString() + "m"
  }
  if (bigNumber.gte(1000)) {
    return bigNumber.div(1000).decimalPlaces(decimals).toString() + "k"
  }

  return bigNumber.decimalPlaces(decimals).toString()
}
