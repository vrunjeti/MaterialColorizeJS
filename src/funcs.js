import { Palettes } from './palettes'

/**
 * Calculates closest material color based on input color
 * @param  {String}  color [the hex value of the color to be materialized]
 * @return {String}        [the hex value of the closest calculated color]
 */
function approximateColor(color) {
  color = hexstrToNum(color)
  if (color === 0xFFFFFF) return 'FFFFFF'
  if (color === 0x000000) return '000000'

  const allColors = getAllColors()

  const bestIndex = allColors
    .map(currColor => colorDistance(color, currColor))
    .reduce((min, curr, index, arr) => (arr[min] < curr) ? min : index, Infinity)

  return allColors[bestIndex]
}

/**
 * Returns the full material color family palette of the input color
 * @param  {String} color [the hex value of the color to find the family palette of]
 * @return {Object}       [the full material color family palette of the input color]
 */
function getColorFamily(color) {
  let match = approximateColor(color)
  // Black and White aren't in a palette (per se) but are coupled together
  if (match === '000000' || match === 'FFFFFF') {
    return {
      'Black': '000000',
      'White': 'FFFFFF'
    }
  }
  let result
  Object.keys(Palettes).forEach(palette => {
    Object.keys(Palettes[palette]).forEach(materialColorWeight => {
      let currMaterialColor = Palettes[palette][materialColorWeight]
      if (match === currMaterialColor) {
        result = Palettes[palette]
      }
    })
  })
  return result
}

/**
 * Calculates "distance" between colors
 * http://stackoverflow.com/questions/6334311/whats-the-best-way-to-round-a-color-object-to-the-nearest-color-constant
 * formula comes from: http://www.compuphase.com/cmetric.htm
 * TLDR: Human vision perception weighs R,G,B differently,
 *       so we need to adjust the weights of the values in our calculation
 * @param  {String} c1 [first color]
 * @param  {String} c2 [second color]
 * @return {Int}       ["distance" between colors]
 */
function colorDistance(c1, c2) {
  c1 = hexstrToNum(c1)
  c2 = hexstrToNum(c2)
  let red1 = getRed(c1)
  let red2 = getRed(c2)
  let rMean = (red1 + red2) >> 1
  let r = red1 - red2
  let g = getGreen(c1) - getGreen(c2)
  let b = getBlue(c1) - getBlue(c2)
  return Math.sqrt((((512+rMean)*r*r)>>8) + 4*g*g + (((767-rMean)*b*b)>>8))
}

/**
 * Helper functions to extract r,g,b components from a hex
 */
function getRed(color) {
  return (color & 0xffffff) >> 16
}

function getGreen(color) {
  return (color & 0x00ffff) >> 8
}

function getBlue(color) {
  return (color & 0x0000ff)
}

/**
 * Converts a hex string to an int, accounts for '#'
 * @param  {String} input [the color to be converted to an int]
 * @return {Int}          [the integer value of the hexstring]
 */
function hexstrToNum(input) {
  if (typeof input === 'number') return input
  return parseInt(input.replace(/^#/, ''), 16)
}

/**
 * Returns a list of all colors in Palette
 * @return {Array} [Every hex string in Palette]
 */
function getAllColors() {
  let result = []
  Object.keys(Palettes).forEach(palette => {
    Object.keys(Palettes[palette]).forEach(materialColorWeight => {
      result.push(Palettes[palette][materialColorWeight])
    })
  })
  return result
}

export default {
  approximateColor,
  getColorFamily,
  colorDistance
}
