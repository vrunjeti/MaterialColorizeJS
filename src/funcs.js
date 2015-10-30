import { Palettes } from './palettes'

/**
 * Calculates closest material color based on input color
 * @param  {String} color [the hex value of the color to be materialized]
 * @return {String}       [the hex value of the closest calculated color]
 */
function approximateColor(color) {
  color = hexstrToNum(color)
  if (color === 0xFFFFFF) return 'FFFFFF'
  if (color === 0x000000) return '000000'

  return getAllColors()
    .map(currColor => ({ color: currColor, distance: colorDistance(color, currColor) }))
    .reduce((min, curr) => (curr.distance < min.distance) ? curr : min, {distance: Infinity})
    .color
}

/**
 * Returns the full material color family palette of the input color
 * @param  {String} color [the hex value of the color to find the family palette of]
 * @return {Object}       [the full material color family palette of the input color]
 */
function getColorFamily(color) {
  const match = approximateColor(color)

  // Black and White aren't in a palette (per se) but are coupled together
  if (match === '000000' || match === 'FFFFFF') {
    return {
      'Black': '000000',
      'White': 'FFFFFF'
    }
  }

  return arrayify(Palettes).find(fam => {
    const family = arrayify(fam)
    if (family.find(col => col === match)) return family
  })
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
  const red1 = getRed(c1)
  const red2 = getRed(c2)
  const rMean = (red1 + red2) >> 1
  const r = red1 - red2
  const g = getGreen(c1) - getGreen(c2)
  const b = getBlue(c1) - getBlue(c2)
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

/**
 * Simple conversion of flat object to array
 * @param  {Object} obj [A flat object]
 * @return {Array}      [The object converted to an array]
 */
function arrayify(obj) {
  return Object.keys(obj).map(key => obj[key])
}

export default {
  approximateColor,
  getColorFamily,
  colorDistance
}
