'use strict';

import React from 'react';
import mc from 'materialcolorize'

export default class ColorPicker extends React.Component {

  /*
   * State variables:
   * value               - String representation of input color
   * materialValue       - String representation of closest Material color
   * materialColorFamily - JSON object of materialValue's family palette
   */

  constructor(props){
    super(props);
    this.state = {
      value: props.default,
      materialValue: mc.approximateColor(props.default),
      materialColorFamily: mc.getColorFamily(props.default)
    };
  }

  handleChange(event){
    var isColor = /(^[0-9A-F]{6}$)/i.test(event.target.value);
    if(isColor){
      this.setState({
        value: event.target.value,
        materialValue: mc.approximateColor(event.target.value),
        materialColorFamily: mc.getColorFamily(event.target.value)
      });
    }
    else {
      this.setState({
        value: null,
        materialValue: null,
        materialColorFamily: null
      });
    }
  }

  get dynamics() {
    let color = this.state.value || 'ffffff';
    return {
      backgroundColor: '#' + color
    };
  }

  get materialDynamics() {
    let color = this.state.materialValue || 'ffffff';
    return {
      backgroundColor: '#' + color
    }
  }

  get materialColorFamily() {
    let palette = this.state.materialColorFamily || {};
    return palette;
  }

  displayTextColor(color) {
    if(mc.colorDistance(color, '000000') < mc.colorDistance(color, 'FFFFFF')) {
      return 'FFFFFF';
    } else {
      return '000000';
    }
  }

  render() {
    let { value } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col l4 m6">
            <label htmlFor="inputHex">Input</label>
            <input type="text" id="inputHex"
              onChange={this.handleChange.bind(this)}
              defaultValue={value} />
          </div>
          <div className="col l4 m6">
            <h4> Output: #{this.state.materialValue} </h4>
          </div>
          <div className="col l4 m6">
            <h4>Family Palette</h4>
          </div>
        </div>
        <div className="row">
          <div className="col l4 m6 s12">
            <div className="colorBox" style={this.dynamics}></div>
          </div>
          <div className="col l4 m6 s12">
            <div className="colorBox" style={this.materialDynamics}></div>
          </div>
          <div className="col l4 m6 s12">
            {
              Object.keys(this.materialColorFamily).map(colorWeight => {
                let color = this.materialColorFamily[colorWeight];
                let textColor = this.displayTextColor(color);
                let familyCell = {
                  backgroundColor: '#' + color,
                  color: '#' + textColor
                }
                return <div className="familyCell valign-wrapper" style={ familyCell }>
                    <div className="center-align valign">{colorWeight}: #{color}</div>
                  </div>
              })
            }
          </div>
        </div>
      </div>
    );
  }

  static PropTypes = {
    default: React.PropTypes.string
  }
  static defaultProps = {
    default: 'fafafa'
  }
}