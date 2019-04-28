import React from 'react';
import PropTypes from 'prop-types';

import './BR2JSX.css';

class BR2JSX extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };
  
  render() {

    var arText = this.props.text.split(/<br\s?\/?>/);

    var arRender=[];
    arText.forEach((elem,index) => {
      arRender.push(elem);
      arRender.push(<br key={index}/> );
    });

    return <div className="br2jsx">{arRender}</div>
  }

}

export default BR2JSX;
