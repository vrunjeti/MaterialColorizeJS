import { palettes, fullPalette } from './palettes';

/**
 * Calculates closest material color based on input color
 * @param  {String}  color [the hex value of the color to be materialized]
 * @param  {Boolean} ref   [set true to return the most accurate material color, set false to return a default 500 value]
 * @return {String}        [the hex value of the closest calculated color]
 */
let approximateColor = (color, ref) => {
  color = hexstrToNum(color);
  let ans = 0, curDistance, bestDistance = Infinity, bestIndex = 0;
  for(let i = 0; i < palettes.mainPalette.length; i++) {
    curDistance = colorDistance(color, palettes.mainPalette[i]);
    if(curDistance < bestDistance){
      bestDistance = curDistance;
      ans = palettes.mainPalette[i];
      bestIndex = i;
    }
  }
  if(!ref) return ans;
  else return refine(color, bestIndex);
}

/**
 * Refines the color approximation by looking through an identified 500 value's family
 * @param  {String} color      [the hex value of the color to be materialized]
 * @param  {Int}    identifier [the index for fullPalette, identifies the color family based on 500 value]
 * @return {String}            [the hex value of the closest calculated color]
 */
let refine = (color, identifier) => {
  color = hexstrToNum(color);
  let ans = 0, curDistance, bestDistance = Infinity;
  let palette = fullPalette[identifier];
  for(let i = 0; i < palette.length; i++) {
    curDistance = colorDistance(color, palette[i]);
    if(curDistance < bestDistance){
      bestDistance = curDistance;
      ans = palette[i];
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
  color = hexstrToNum(color);
  let curDistance, bestDistance = Infinity, bestIndex = 0;
  for(let i = 0; i < palettes.mainPalette.length; i++){
    curDistance = colorDistance(color, palettes.mainPalette[i]);
    if(curDistance < bestDistance){
      bestDistance = curDistance;
      bestIndex = i;
    }
  }
  return fullPalette[bestIndex];
}

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
  refine,
  colorDistance,
  getColorFamily,
  getRed,
  getGreen,
  getBlue
}