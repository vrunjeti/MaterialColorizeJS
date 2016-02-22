'use strict';

import React from 'react';
import { ColorPicker } from './components'; // Looks automatically for index.js inside components folder

// let ColorPicker = Components.ColorPicker;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <body>
          <h1> Material Colorize </h1>
          <p>Input a hex representation of a color here, and the closest material color will be returned.</p>

        </body>
        <ColorPicker default='4AAA58'/>
      </div>
    );
  }

  static PropTypes = {}

  static defaultProps = {}

  static contextTypes = {}
}