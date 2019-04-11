import React from 'react';
import PropTypes from 'prop-types';

class ShoppingProduct extends React.Component {

    static propTypes = {
        id:          PropTypes.number.isRequired,
        name:        PropTypes.string.isRequired,
        price:       PropTypes.number.isRequired,
        url:         PropTypes.string.isRequired,
        quantity:    PropTypes.number.isRequired,
        selectedId:  PropTypes.any.isRequired,
        isBlocked:   PropTypes.bool.isRequired,
        cbDeleted:   PropTypes.func.isRequired,
        cbSelected:  PropTypes.func.isRequired,
        cbEdit:      PropTypes.func.isRequired,
    };

    productSelected = (EO) => {     
        if (EO.target.className == 'DeleteButton' || EO.target.className == 'EditButton' || this.props.isBlocked) {
          return;
        }
        else {
          this.props.cbSelected(EO.target.parentNode.id);
        }
    }

    deleteClicked = (EO) => {
        if (this.props.isBlocked) {
          return;
        }
        var deleteConfirmed = confirm('Удалить продукт?');
        if (deleteConfirmed) {
          this.props.cbDeleted(EO.target.parentNode.parentNode.id);
        }
    }

    editClicked = (EO) => {
        if (this.props.isBlocked) {
          return;
        }
        this.props.cbEdit(EO.target.parentNode.parentNode.id);
    }

    render() {

        var trClassName;
        this.props.id == this.props.selectedId ? trClassName = "selected" : trClassName = "unselected";

        return (
        <tr className={trClassName} id={this.props.id} >
            <td onClick={this.productSelected}>{this.props.name}</td>
            <td onClick={this.productSelected}>{this.props.price}</td>
            <td onClick={this.productSelected}>{this.props.url}</td>
            <td onClick={this.productSelected}>{this.props.quantity}</td>
            <td onClick={this.productSelected}>
              <input className='EditButton' type='button' value='Edit' onClick={this.editClicked} disabled={this.props.isBlocked}/>            
              <input className='DeleteButton' type='button' value='Delete' onClick={this.deleteClicked} disabled={this.props.isBlocked}/>
            </td>
        </tr>
        );
    }

}

export default ShoppingProduct;