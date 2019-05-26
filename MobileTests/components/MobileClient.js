import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

import {voteEvents} from './events';

class MobileClient extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };
  state = {
    info: this.props.info,
  };

  componentWillReceiveProps = (newProps) => {
      this.setState({info:newProps.info});
  };

  editClicked = (EO) => {
    voteEvents.emit('EditClient', this.props.info.id);
  }

  deleteClicked = (EO) => {
    var deleteConfirmed = confirm('Удалить клиента?');
    if (deleteConfirmed) {
      voteEvents.emit('DeleteClicked', this.props.info.id);
    }
  }

  render() {

    console.log("MobileClient id="+this.props.info.id+" render");
    
    return (
      <tr className='MobileClient' id={this.props.info.id}>
        <td>{this.state.info.fam}</td>
        <td>{this.state.info.im}</td>
        <td>{this.state.info.otch}</td>
        <td>{this.state.info.balance}</td>
        <td className={this.state.info.balance > 0 ? "StatusActive" : "StatusBlocked"}>{this.state.info.balance > 0 ? "active" : "blocked"}</td>
        <td><input className='button' type='button' value='Редактировать' onClick={this.editClicked}/></td>
        <td><input className='button' type='button' value='Удалить' onClick={this.deleteClicked}/></td>
      </tr>
    );

  }

}

export default MobileClient;
