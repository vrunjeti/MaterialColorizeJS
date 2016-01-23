# MaterialColorizeJS
A library to convert a color to its closest on [Google's Material Design Color Palette](https://www.google.com/design/spec/style/color.html#)

Try the [live demonstration](http://hyunbinpark.com/MaterialColors/)!

There is a [Java version](https://github.com/hyunbin/MaterialColors/) available too!

## Installing
The library is available as a node module. Use the `--save` flag to save this as a dependency in your `package.json`.

    npm install materialcolorize

Once you have it installed, import the desired functions.

ES6:
```javascript
    import { approximateColor, getColorFamily } from 'materialcolorize'
    // or
    import mc from 'materialcolorize'
```

ES5:
```javascript
    var approximateColor = require('materialcolorize').approximateColor;
    // or
    var mc = require('materialcolorize');
```

If you plan on using this on the client side, I recommend using [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/) to be able to `require` on the client side.

## Usage

### approximateColor(color)
Pass in a color as a hexstring or hexadecimal number and `approximateColor` will return the closest material color as a string.

**Note:**
This function does not take 3 digit hex values yet, but that feature will be added in a later release.

```javascript
    // returns '4CAF50'
    approximateColor('#4AAA58')

    // returns 'FF5722'
    approximateColor('F7642A')

    // returns '80DEEA'
    approximateColor(0x78E1F6)
```

=============

### getColorFamily(color)
Pass in a color as a hexstring or hexadecimal number and `getColorFamily` will return the family palette of the input color. The keys represent each color's weight.

```javascript
    const greenPalette = getColorFamily('ADCF83')
    // greenPalette is:
    {
      '50': 'F1F8E9',
      '100': 'DCEDC8',
      '200': 'C5E1A5',
      '300': 'AED581',
      '400': '9CCC65',
      '500': '8BC34A',
      '600': '7CB342',
      '700': '689F38',
      '800': '558B2F',
      '900': '33691E',
      'A100': 'CCFF90',
      'A200': 'B2FF59',
      'A400': '76FF03',
      'A700': '64DD17'
    }
```

=============

### colorDistance(color1, color2)
Calculates the 'distance' between two colors by implementing [this formula](http://www.compuphase.com/cmetric.htm). `approximateColor()` uses this to and returns the material color with the minimum distance.

There are limited reasons to use this function alone, but one useful case is deciding whether to use black or white text on a colored background (this is an example that is used for the [demo page](http://hyunbin.me/MaterialColors/) to assign the color of the text over the family palette colors):

```javascript
  function displayTextColor(color) {
    // If the input color (each color in the family palette) is 'closer' to black than it is to white,
    // set the overlying text color to white
    if (colorDistance(color, '000000') < colorDistance(color, 'FFFFFF')) {
      return 'FFFFFF'
    } else {
      return '000000'
    }
  }
```

## Contributors
Made by [Varun Munjeti](https://github.com/vrunjeti) and [Hyunbin Park](https://github.com/hyunbin). Special thanks to [Arjun Sarode](https://github.com/asarode) for helping us get ES6 set up and with React for the demo page!
