import React from 'react';
/*
function withRainbowFrame(arColors) {
  return function(Component) {
    return props => {
      var actualFrames = props.children;
      arColors.forEach((color) => actualFrames = <div style={{border:"solid 5px "+color, padding:"10px"}}>{actualFrames}</div>);
      return actualFrames;
    };
  };
}
*/
const withRainbowFrame = arColors => Component => props => {
  var actualFrames = props.children;
  arColors.forEach((color) => {actualFrames = <div style={{border:"solid 5px "+color, padding:"10px"}}>{actualFrames}</div>});
  return actualFrames;
};

export { withRainbowFrame };
