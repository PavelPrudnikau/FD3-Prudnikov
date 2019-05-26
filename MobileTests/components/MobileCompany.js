import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import ClientInfo from './ClientInfo';
import './MobileCompany.css';

import {voteEvents} from './events';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    //name: this.props.name,
    clients: this.props.clients,
    clientInfoMode: 0,  //1 - add product, 2 - edit product
    actualClient: null,
    showMode: "",
    lastId: this.props.clients.length,
  };

  componentDidMount = () => {
    voteEvents.addListener('EditClient',this.editClient);
    voteEvents.addListener('DeleteClicked',this.deleteClient);
    voteEvents.addListener('SaveData',this.saveData); 
    voteEvents.addListener('CancelData',this.cancelData);         
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('EditClient',this.editClient);
    voteEvents.removeListener('DeleteClicked',this.deleteClient);
    voteEvents.removeListener('SaveData',this.saveData);   
    voteEvents.removeListener('CancelData',this.cancelData);           
  };
/*
  setName1 = () => {
    this.setState({name:'Velcom'});
  };

  setName2 = () => {
    this.setState({name:'МТС'});
  };
*/  
  addClient = () => {
    this.setState({ 
      actualClient: null,
      clientInfoMode: 1,
    });
  };

  editClient = (id) => {
    let actualClient = this.state.clients.find( client => { 
      return (client.id === id);
    });
    this.setState({ 
      actualClient: actualClient,
      clientInfoMode: 2,
    });
  }
 
  deleteClient = (id) => {
    var newClients = [];
    this.state.clients.forEach(client => {
        if ( client.id != id ) {
          newClients.push(client);
        };
    });
    this.setState({ 
      clients: newClients,
      clientInfoMode: 0,
    });
  }

  saveData = (newClient) => {
    let newClients = this.state.clients.slice();
    if (this.state.clientInfoMode == 1) {         //Add
      newClients.push(newClient);

      this.setState({ 
        clients: newClients,
        clientInfoMode: 0,
        actualClient: null,
        lastId: newClient.id,
      });      
    }
    else if(this.state.clientInfoMode == 2) {     //Edit
      newClients.forEach((client,index) => {
        if(newClient.id === client.id)
        {
          newClients[index] = newClient;
          return;
        }
      });

      this.setState({ 
        clients: newClients,
        clientInfoMode: 0,
        actualClient: null,
      });   

    }
  }

  cancelData = ( ) => {
    this.setState({ 
      actualClient: null,
      clientInfoMode: 0,
    });
  }

  setAll = () => {
    this.setState({showMode: ""});
  };

  setActive = () => {
    this.setState({showMode: "Active"});    
  };

  setBlocked = () => {
    this.setState({showMode: "Blocked"}); 
  };

  render() {

    console.log("MobileCompany render");

      var clientsCode=this.state.clients.filter( client => {
        if(this.state.showMode == "Active") {
          return client.balance > 0;
        }
        else if(this.state.showMode == "Blocked"){
          return client.balance < 0;
        }
        else {
          return client;
        }
      });

      clientsCode=clientsCode.map( client =>
        <MobileClient key={client.id} info={client}  />
      );


    return (
      <div className='MobileCompany'>
        {/*
        <input type="button" className='button' value="Velcom" onClick={this.setName1} />
        <input type="button" className='button' value="МТС" onClick={this.setName2} />
        <div className='MobileCompanyName'>Компания: {this.state.name}</div>
        <br/>
        */}
        <input type="button" className='button' value="Все" onClick={this.setAll} />
        <input type="button" className='button' value="Активные" onClick={this.setActive} />
        <input type="button" className='button' value="Заблокированные" onClick={this.setBlocked} />
        <br/><br/> 
        <table className="MobileCompanyClients">
          <thead><tr><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Баланс</th><th>Статус</th><th>Редактировать</th><th>Удалить</th></tr></thead>
          <tbody>{clientsCode}</tbody>
        </table>
        <br/> 
        <input type="button" className='button' value="Добавить клиента" onClick={this.addClient} />
        <br/>
          {this.state.clientInfoMode!=0 &&
              <ClientInfo
                id={this.state.actualClient ? this.state.actualClient.id : this.state.lastId + 1}
                actualClient={this.state.actualClient}
                clientInfoMode={this.state.clientInfoMode}
              />
          }
      </div>
    );

  }

}

export default MobileCompany;
