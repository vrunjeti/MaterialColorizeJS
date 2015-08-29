import { palettes, fullPalette } from './palettes';

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

let hexstrToNum = (input) => {
  if(typeof input === 'number') return input;
  return parseInt(input.replace(/^#/, ''), 16);
}

export default {
  approximateColor,
  refine,
  colorDistance,
  getColorFamily
}