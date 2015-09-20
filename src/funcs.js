import { palettes, fullPalette, JSONPalette } from './palettes';

/**
 * Calculates closest material color based on input color
 * @param  {String}  color [the hex value of the color to be materialized]
 * @return {String}        [the hex value of the closest calculated color]
 */
let approximateColor = (color) => {
  color = hexstrToNum(color);
  let ans = 0,
      curDistance,
      bestDistance = Infinity;
  for(let i = 0; i < fullPalette.length; i++) {
    for(let j = 0; j < fullPalette[i].length; j++) {
      curDistance = colorDistance(color, fullPalette[i][j]);
      if(curDistance < bestDistance) {
        bestDistance = curDistance;
        ans = fullPalette[i][j];
      }
    }
  }
  return ans;
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
let colorDistance = (c1, c2) => {
  c1 = hexstrToNum(c1);
  c2 = hexstrToNum(c2);
  let red1 = getRed(c1);
  let red2 = getRed(c2);
  let rMean = (red1 + red2) >> 1;
  let r = red1 - red2;
  let g = getGreen(c1) - getGreen(c2);
  let b = getBlue(c1) - getBlue(c2);

  let ans = Math.sqrt((((512+rMean)*r*r)>>8) + 4*g*g + (((767-rMean)*b*b)>>8));
  return ans;
}

/**
 * Returns the full material color family palette of the input color
 * @param  {String} color [the hex value of the color to find the family palette of]
 * @return {Array}        [the full material color family palette of the input color]
 */
let getColorFamily = (color) => {
  let match = approximateColor(color);
  for(let i = 0; i < fullPalette.length; i++) {
    for(let j = 0; j < fullPalette[i].length; j++) {
      if(match === fullPalette[i][j]) {
        return JSONPalette[Object.keys(JSONPalette)[i]];
      }
    }
  }
}

/**
 * Helper functions to extract r,g,b components from a hex
 */
let getRed = (color) => {
  return (color & 0xffffff) >> 16;
}

let getGreen = (color) => {
  return (color & 0x00ffff) >> 8;
}

let getBlue = (color) => {
  return (color & 0x0000ff);
}

/**
 * Converts a hex string to an int, accounts for '#'
 * @param  {String} input [the color to be converted to an int]
 * @return {Int}          [the integer value of the hexstring]
 */
let hexstrToNum = (input) => {
  if(typeof input === 'number') return input;
  return parseInt(input.replace(/^#/, ''), 16);
}

export default {
  approximateColor,
  colorDistance,
  getColorFamily
}