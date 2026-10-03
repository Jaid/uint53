const maxFullHexLength = 13
const pow2_52 = 2 ** 52
const hexToUint53 = (hex: string) => {
  if (hex.length === 0) {
    return 0
  }
  if (hex.length <= maxFullHexLength) {
    const value = Number.parseInt(hex, 16)
    return Number.isNaN(value) ? 0 : value
  }
  const partialChar = hex.slice(-14, -maxFullHexLength)
  const fullPart = hex.slice(-maxFullHexLength)
  const partialBit = Number.parseInt(partialChar, 16) & 1
  const fullValue = Number.parseInt(fullPart, 16)
  if (Number.isNaN(fullValue)) {
    return 0
  }
  return partialBit * pow2_52 + fullValue
}

export default hexToUint53
