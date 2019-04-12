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
        product:        PropTypes.object,
    }

    state = {
        name:        this.props.name,
        price:       this.props.price,
        url:         this.props.url,
        quantity:    this.props.quantity,
        saveBlocked: true,
    }

    save = () => {
        let tempProduct = {id: '', name: '', price: '', url: '', quantity: ''};
        tempProduct.id = this.props.id;
        tempProduct.name = this.state.name;
        tempProduct.price = this.state.price;
        tempProduct.url = this.state.url;    
        tempProduct.quantity = this.state.quantity;

        this.props.cbDataSave(tempProduct);
        this.props.cbBlockTable(false);  
      }

    cancel = () => {
        this.props.cbDataCancel();
        this.props.cbBlockTable(false);
    }

    productChanged = (EO) => {        
        if (EO.target.name == "InfoName") {
            this.setState( {name: EO.target.value} );
        }
        else if (EO.target.name == "InfoPrice") {
            this.setState( {price: parseInt(EO.target.value)} );
        }
        else if (EO.target.name == "InfoUrl") {
            this.setState( {url: EO.target.value} );
        }
        else if (EO.target.name == "InfoQuantity") {
            this.setState( {quantity: parseInt(EO.target.value)} );
        }
        this.setState( {saveBlocked: false} );
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
                        {this.props.workMode==2 && <input type='text' name='InfoName' className='' onChange={this.productChanged} defaultValue={this.state.name}/>}
                        {this.props.workMode==3 && this.state.name }
                    </label>
                    <br/>
                    <label>
                        <span>Price: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoPrice' className='' onChange={this.productChanged}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoPrice' className='' onChange={this.productChanged} defaultValue={this.state.price}/>}
                        {this.props.workMode==3 && this.state.price }
                    </label>
                    <br/>
                    <label>
                        <span>Url: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoUrl' className='' onChange={this.productChanged}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoUrl' className='' onChange={this.productChanged} defaultValue={this.state.url}/>}
                        {this.props.workMode==3 && this.state.url }
                    </label>
                    <br/>
                    <label>
                        <span>Quantity: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoQuantity' className='' onChange={this.productChanged}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoQuantity' className='' onChange={this.productChanged} defaultValue={this.state.quantity}/>}
                        {this.props.workMode==3 && this.state.quantity }
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
