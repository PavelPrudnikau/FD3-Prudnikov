import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.array.isRequired,
  };
  
  paintFrame = (color, child) => {
    return <div style={{border:"solid 5px "+color, padding:"10px"}}>{child}</div>
  }

  render() {

    var actualFrames = this.props.children;
    this.props.colors.forEach((color) => actualFrames = this.paintFrame(color, actualFrames) );

    return actualFrames
  }

}

export default RainbowFrame;
