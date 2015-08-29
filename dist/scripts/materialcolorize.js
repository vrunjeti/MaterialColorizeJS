(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _palettes = require('./palettes');

var approximateColor = function approximateColor(color, ref) {
  color = hexstrToNum(color);
  var ans = 0,
      curDistance = undefined,
      bestDistance = Infinity,
      bestIndex = 0;
  for (var i = 0; i < _palettes.palettes.mainPalette.length; i++) {
    curDistance = colorDistance(color, _palettes.palettes.mainPalette[i]);
    if (curDistance < bestDistance) {
      bestDistance = curDistance;
      ans = _palettes.palettes.mainPalette[i];
      bestIndex = i;
    }
  }
  if (!ref) return ans;else return refine(color, bestIndex);
};

var refine = function refine(color, identifier) {
  color = hexstrToNum(color);
  var ans = 0,
      curDistance = undefined,
      bestDistance = Infinity;
  var palette = _palettes.fullPalette[identifier];
  for (var i = 0; i < palette.length; i++) {
    curDistance = colorDistance(color, palette[i]);
    if (curDistance < bestDistance) {
      bestDistance = curDistance;
      ans = palette[i];
    }
  }
  return ans;
};

var colorDistance = function colorDistance(c1, c2) {
  c1 = hexstrToNum(c1);
  c2 = hexstrToNum(c2);
  var red1 = getRed(c1);
  var red2 = getRed(c2);
  var rMean = red1 + red2 >> 1;
  var r = red1 - red2;
  var g = getGreen(c1) - getGreen(c2);
  var b = getBlue(c1) - getBlue(c2);

  var ans = Math.sqrt(((512 + rMean) * r * r >> 8) + 4 * g * g + ((767 - rMean) * b * b >> 8));
  return ans;
};

var getColorFamily = function getColorFamily(color) {
  color = hexstrToNum(color);
  var curDistance = undefined,
      bestDistance = Infinity,
      bestIndex = 0;
  for (var i = 0; i < _palettes.palettes.mainPalette.length; i++) {
    curDistance = colorDistance(color, _palettes.palettes.mainPalette[i]);
    if (curDistance < bestDistance) {
      bestDistance = curDistance;
      bestIndex = i;
    }
  }
  return _palettes.fullPalette[bestIndex];
};

var getRed = function getRed(color) {
  return (color & 0xffffff) >> 16;
};

var getGreen = function getGreen(color) {
  return (color & 0x00ffff) >> 8;
};

var getBlue = function getBlue(color) {
  return color & 0x0000ff;
};

var hexstrToNum = function hexstrToNum(input) {
  if (typeof input === 'number') return input;
  return parseInt(input.replace(/^#/, ''), 16);
};

exports['default'] = {
  approximateColor: approximateColor,
  refine: refine,
  colorDistance: colorDistance,
  getColorFamily: getColorFamily
};
module.exports = exports['default'];

},{"./palettes":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _funcs = require('./funcs');

exports['default'] = {
  approximateColor: _funcs.approximateColor,
  refine: _funcs.refine,
  colorDistance: _funcs.colorDistance,
  getColorFamily: _funcs.getColorFamily
};
module.exports = exports['default'];

},{"./funcs":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var palettes = {
  mainPalette: ["F44336", "E91E63", "9C27B0", "673AB7", "3F51B5", "2196F3", "03A9F4", "00BCD4", "009688", "4CAF50", "8BC34A", "CDDC39", "FFEB3B", "FFC107", "FF9800", "FF5722", "795548", "9E9E9E", "607D8B"],
  redPalette: ["FFEBEE", "FFCD02", "EF9A9A", "E57373", "EF5350", "F44336", "E53935", "D32F2F", "C62828", "B71C1C", "FF8A80", "FF5252", "FF1744", "D50000"],
  pinkPalette: ["FCE4EC", "F8BBD0", "F48FB1", "F06292", "EC407A", "E91E63", "D81B60", "C2185B", "AD1457", "880E4F", "FF80AB", "FF4081", "F50057", "C51162"],
  purplePalette: ["F3E5F5", "E1BEE7", "CE93D8", "BA68C8", "AB47BC", "9C27B0", "8E24AA", "7B1FA2", "6A1B9A", "4A148C", "EA80FC", "E040FB", "D500F9", "AA00FF"],
  deepPurplePalette: ["EDE7F6", "D1C4E9", "B39DDB", "9575CD", "7E57C2", "673AB7", "5E35B1", "512DA8", "4527A0", "311B92", "B388FF", "7C4DFF", "651FFF", "6200EA"],
  indigoPalette: ["E8EAF6", "C5CAE9", "9FA8DA", "7986CB", "5C6BC0", "3F51B5", "3949AB", "303F9F", "283593", "1A237E", "8C9EFF", "536DFE", "3D5AFE", "304FFE"],
  bluePalette: ["E3F2FD", "BBDEFB", "90CAF9", "64B5F6", "42A5F5", "2196F3", "1E88E5", "1976D2", "1565C0", "0D47A1", "82B1FF", "448AFF", "2979FF", "2962FF"],
  lightBluePalette: ["E1F5FE", "B3E5FC", "81D4fA", "4fC3F7", "29B6FC", "03A9F4", "039BE5", "0288D1", "0277BD", "01579B", "80D8FF", "40C4FF", "00B0FF", "0091EA"],
  cyanPalette: ["E0F7FA", "B2EBF2", "80DEEA", "4DD0E1", "26C6DA", "00BCD4", "00ACC1", "0097A7", "00838F", "006064", "84FFFF", "18FFFF", "00E5FF", "00B8D4"],
  tealPalette: ["E0F2F1", "B2DFDB", "80CBC4", "4DB6AC", "26A69A", "009688", "00897B", "00796B", "00695C", "004D40", "A7FFEB", "64FFDA", "1DE9B6", "00BFA5"],
  greenPalette: ["E8F5E9", "C8E6C9", "A5D6A7", "81C784", "66BB6A", "4CAF50", "43A047", "388E3C", "2E7D32", "1B5E20", "B9F6CA", "69F0AE", "00E676", "00C853"],
  lightGreenPalette: ["F1F8E9", "DCEDC8", "C5E1A5", "AED581", "9CCC65", "8BC34A", "7CB342", "689F38", "558B2F", "33691E", "CCFF90", "B2FF59", "76FF03", "64DD17"],
  limePalette: ["F9FBE7", "F0F4C3", "E6EE9C", "DCE775", "D4E157", "CDDC39", "C0CA33", "A4B42B", "9E9D24", "827717", "F4FF81", "EEFF41", "C6FF00", "AEEA00"],
  yellowPalette: ["FFFDE7", "FFF9C4", "FFF590", "FFF176", "FFEE58", "FFEB3B", "FDD835", "FBC02D", "F9A825", "F57F17", "FFFF82", "FFFF00", "FFEA00", "FFD600"],
  amberPalette: ["FFF8E1", "FFECB3", "FFE082", "FFD54F", "FFCA28", "FFC107", "FFB300", "FFA000", "FF8F00", "FF6F00", "FFE57F", "FFD740", "FFC400", "FFAB00"],
  orangePalette: ["FFF3E0", "FFE0B2", "FFCC80", "FFB74D", "FFA726", "FF9800", "FB8C00", "F57C00", "EF6C00", "E65100", "FFD180", "FFAB40", "FF9100", "FF6D00"],
  deepOrangePalette: ["FBE9A7", "FFCCBC", "FFAB91", "FF8A65", "FF7043", "FF5722", "F4511E", "E64A19", "D84315", "BF360C", "FF9E80", "FF6E40", "FF3D00", "DD2600"],
  brownPalette: ["EFEBE9", "D7CCC8", "BCAAA4", "A1887F", "8D6E63", "795548", "6D4C41", "5D4037", "4E342E", "3E2723"],
  greyPalette: ["FAFAFA", "F5F5F5", "EEEEEE", "E0E0E0", "BDBDBD", "9E9E9E", "757575", "616161", "424242", "212121", "000000", "ffffff"],
  blueGreyPalette: ["ECEFF1", "CFD8DC", "B0BBC5", "90A4AE", "78909C", "607D8B", "546E7A", "455A64", "37474F", "263238"]
};
var fullPalette = [palettes.redPalette, palettes.pinkPalette, palettes.purplePalette, palettes.deepPurplePalette, palettes.indigoPalette, palettes.bluePalette, palettes.lightBluePalette, palettes.cyanPalette, palettes.tealPalette, palettes.greenPalette, palettes.lightGreenPalette, palettes.limePalette, palettes.yellowPalette, palettes.amberPalette, palettes.orangePalette, palettes.deepOrangePalette, palettes.brownPalette, palettes.greyPalette, palettes.blueGreyPalette];

exports["default"] = {
  palettes: palettes,
  fullPalette: fullPalette
};
module.exports = exports["default"];

},{}]},{},[2]);
