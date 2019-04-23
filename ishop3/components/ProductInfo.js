import React from 'react';
import PropTypes from 'prop-types';

import './ProductInfo.css';

class ProductInfo extends React.Component {

    static propTypes = {
        product:        PropTypes.object.isRequired,
        workMode:       PropTypes.number.isRequired,  //1 - add product, 2 - edit product, 3 - select product
        headerName:     PropTypes.string.isRequired,
        cbDataSave:     PropTypes.func.isRequired,
        cbDataCancel:   PropTypes.func.isRequired,
        cbBlockTable:   PropTypes.func.isRequired,
    }

    state = {            // сработает при построении компонента (constructor+WM+DM)
        name:        this.props.product.name,
        price:       this.props.product.price,
        url:         this.props.product.url,
        quantity:    this.props.product.quantity,
        product:     this.props.product,
        saveBlocked: true,
        errName:     "",
        errPrice:    "",
        errUrl:      "",
        errQuantity: "",
    }

    componentDidUpdate = (oldProps, oldState) => { 
        console.log('componentDidUpdate');     
        if ( oldProps.product!==this.props.product && this.state.saveBlocked) {
            this.setState({        // сработает при обновлении компонента
                name:       this.props.product.name,
                price:      this.props.product.price,
                url:        this.props.product.url,
                quantity:   this.props.product.quantity,
                product:    this.props.product,
            });
        }
    };
   
    save = () => { 
        let tempProduct = {
            ...this.state.product, name: this.state.name, price: parseInt(this.state.price), url: this.state.url, quantity: parseInt(this.state.quantity)
        };
        this.checkData();
        
        if(!this.state.saveBlocked)
        {
            this.props.cbDataSave(tempProduct);
            this.props.cbBlockTable(false);
        }
      }

    cancel = () => {
        this.props.cbDataCancel();
        this.props.cbBlockTable(false);
    }

    checkData = (EO) => {
        
        var isError = false;
        //if (EO.target.name == "InfoName") {
            if(typeof this.state.name != "string" || this.state.name == "")
            {
                this.setState( {errName: "Value must be a string"} );
                isError = true;
            }
            else 
                this.setState( {errName: ""} );
        //}
       // else if (EO.target.name == "InfoPrice") {
            if(isNaN(this.state.price) || this.state.price < 0 || this.state.price == "")
            {
                this.setState( {errPrice: "Value must be a number greater than 0"} );
                isError = true;
            }
            else
                this.setState( {errPrice: ""} );
        //}
       // else if (EO.target.name == "InfoUrl") {
            if(this.state.url.indexOf('http://') < 0 || this.state.url == "")
            {
                this.setState( {errUrl: "Value shoud have 'http://' "} );
                isError = true;
            }
                else 
                this.setState( {errUrl: ""} );
       // }
        //else if (EO.target.name == "InfoQuantity") {
            if(isNaN(this.state.quantity) || this.state.quantity < 0 || this.state.quantity == "")
            {
                this.setState( {errQuantity: "Value must be a positive integer"} );
                isError = true;
            }
            else 
                this.setState( {errQuantity: ""} );
        //}
        this.setState( {saveBlocked: isError} );

    }

    productChanged = (EO) => {

        if (EO.target.name == "InfoName") {
            this.setState( {name: EO.target.value} );
        }
        else if (EO.target.name == "InfoPrice") {
            this.setState( {price: EO.target.value} );
        }
        else if (EO.target.name == "InfoUrl") {
            this.setState( {url: EO.target.value} );
        }
        else if (EO.target.name == "InfoQuantity") {
            this.setState( {quantity: EO.target.value} );
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
                <div className='ProductInfo' key={this.props.product.id}>
                    <h1> {this.props.headerName ? this.props.headerName : this.props.product.name} </h1>
                    <label>
                        <span>ID: {this.props.product.id} </span>
                    </label>
                    <br/>
                    <label>
                        <span className='inputName'>Name: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoName' className='' onChange={this.productChanged} onBlur={this.checkData}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoName' className='' onChange={this.productChanged} onBlur={this.checkData} value={this.state.name}/>}
                        {this.props.workMode==3 && this.state.name }
                        <span className='error'>{this.state.errName}</span>
                    </label>
                    <br/>
                    <label>
                        <span className='inputName'>Price: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoPrice' className='' onChange={this.productChanged} onBlur={this.checkData}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoPrice' className='' onChange={this.productChanged} onBlur={this.checkData} value={this.state.price}/>}
                        {this.props.workMode==3 && this.state.price }
                        <span className='error'>{this.state.errPrice}</span>
                    </label>
                    <br/>
                    <label>
                        <span className='inputName'>Url: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoUrl' className='' onChange={this.productChanged} onBlur={this.checkData}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoUrl' className='' onChange={this.productChanged} onBlur={this.checkData} value={this.state.url}/>}
                        {this.props.workMode==3 && this.state.url }
                        <span className='error'>{this.state.errUrl}</span>
                    </label>
                    <br/>
                    <label>
                        <span className='inputName'>Quantity: </span>
                        {this.props.workMode==1 && <input type='text' name='InfoQuantity' className='' onChange={this.productChanged} onBlur={this.checkData}/>}
                        {this.props.workMode==2 && <input type='text' name='InfoQuantity' className='' onChange={this.productChanged} onBlur={this.checkData} value={this.state.quantity}/>}
                        {this.props.workMode==3 && this.state.quantity }
                        <span className='error'>{this.state.errQuantity}</span>
                    </label>
                    <br/>
                    {this.props.workMode==1 && <input type='button' value="Add"  onClick={this.save} disabled={this.state.saveBlocked}/>}
                    {this.props.workMode==2 && <input type='button' value="Save" onClick={this.save} disabled={this.state.saveBlocked}/>}
                    {this.props.workMode!=3 && <input type='button' value="Cancel" onClick={this.cancel} />}
                </div>
            )
        }

    }
}

export default ProductInfo;
