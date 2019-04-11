import React from 'react';
import PropTypes from 'prop-types';

class ProductInfo extends React.Component {

    static propTypes = {
        workMode:       PropTypes.number.isRequired,  //1 - add product, 2 - edit product, 3 - select product
        headerName:     PropTypes.string.isRequired,
        id:             PropTypes.number,
        name:           PropTypes.string,
        price:          PropTypes.number,
        url:            PropTypes.string,
        quantity:       PropTypes.number,
        cbDataSave:     PropTypes.func.isRequired,
        cbDataCancel:   PropTypes.func.isRequired,
        cbBlockTable:   PropTypes.func.isRequired,
    }

    state = {
        tempProduct: {id: '', name: '', price: '', url: '', quantity: ''},
        name:        '',
        price:       '',
        url:         '',
        quantity:    '',
        saveBlocked: true,
    }

    save = () => {
        //передать новые данные продукта наверх и перерендерить        
        //-->
        this.state.tempProduct.id = this.props.id;
        this.state.name ? this.state.tempProduct.name = this.state.name : this.state.tempProduct.name = this.props.name;
        this.state.price ? this.state.tempProduct.price = this.state.price : this.state.tempProduct.price = this.props.price;
        this.state.url ? this.state.tempProduct.url = this.state.url : this.state.tempProduct.url = this.props.url;
        this.state.quantity ? this.state.tempProduct.quantity = this.state.quantity : this.state.tempProduct.quantity = this.props.quantity;
        //
        this.props.cbDataSave(this.state.tempProduct);
        this.props.cbBlockTable(false);
      }

    cancel = () => {
        this.props.cbDataCancel();
        this.props.cbBlockTable(false);
    }

    productChanged = (EO) => {
        
        if (EO.target.name == "InfoName") {
            this.state.name = EO.target.value;
        }
        else if (EO.target.name == "InfoPrice") {
            this.state.price = parseInt(EO.target.value);
        }
        else if (EO.target.name == "InfoUrl") {
            this.state.url = EO.target.value;
        }
        else if (EO.target.name == "InfoQuantity") {
            this.state.quantity = parseInt(EO.target.value);
        }
        this.state.saveBlocked = false;
        this.props.cbBlockTable(true);
    }
    
    render() {

        if (this.props.workMode==0) {
            return null;
        }
        else {
            return (
                <div className='ProductInfo' key={this.props.id}>
                    <h1> {this.props.headerName} </h1>
                    <label>
                        <span>ID: {this.props.id} </span>
                    </label>
                    <br/>
                    <label>
                        <span>Name: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoName' className='' onChange={this.productChanged}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoName' className='' onChange={this.productChanged} defaultValue={this.props.name}/>}
                        {this.props.workMode==3 && this.props.name }
                    </label>
                    <br/>
                    <label>
                        <span>Price: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoPrice' className='' onChange={this.productChanged}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoPrice' className='' onChange={this.productChanged} defaultValue={this.props.price}/>}
                        {this.props.workMode==3 && this.props.price }
                    </label>
                    <br/>
                    <label>
                        <span>Url: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoUrl' className='' onChange={this.productChanged}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoUrl' className='' onChange={this.productChanged} defaultValue={this.props.url}/>}
                        {this.props.workMode==3 && this.props.url }
                    </label>
                    <br/>
                    <label>
                        <span>Quantity: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoQuantity' className='' onChange={this.productChanged}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoQuantity' className='' onChange={this.productChanged} defaultValue={this.props.quantity}/>}
                        {this.props.workMode==3 && this.props.quantity }
                    </label>
                    <br/>
                    {this.props.workMode==1 && <input type='button' value="Add"  onClick={this.save} disabled={this.state.saveBlocked}/>}
                    {this.props.workMode==2 && <input type='button' value="Save" onClick={this.save} disabled={this.state.saveBlocked}/>}
                    {this.props.workMode!=3 && <input type='button' value='Cancel' onClick={this.cancel} />}
                </div>
            )
        }

    }
}

export default ProductInfo;
