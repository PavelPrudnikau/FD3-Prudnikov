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
        saveBlocked: false,
        errName:     "",
        errPrice:    "",
        errUrl:      "",
        errQuantity: "",
    }

    componentDidUpdate = (oldProps, oldState) => { 
        this.validData();
        
        if ( oldProps.product.id!==this.props.product.id) {
            this.setState({        // сработает при обновлении компонента
                name:       this.props.product.name,
                price:      this.props.product.price,
                url:        this.props.product.url,
                quantity:   this.props.product.quantity,
                product:    this.props.product,
            });
        }
    };

    componentDidMount = () => {
        this.validData();
    };

    save = () => { 
        let tempProduct = {
            ...this.state.product, name: this.state.name, price: parseInt(this.state.price), url: this.state.url, quantity: parseInt(this.state.quantity)
        };
        
        if(!this.validData())
        {
            this.props.cbDataSave(tempProduct);
            this.props.cbBlockTable(false);
        }
      }

    cancel = () => {
        this.props.cbDataCancel();
        this.props.cbBlockTable(false);
    }

    validData = () => {

        var isError = false;
            //name
        var textNameError = "";
        if( this.props.workMode != 3 && (typeof this.state.name != "string" || this.state.name == "") )
        {
            textNameError = "Value must be a string";
            isError = true;
        }
        
        if(textNameError != this.state.errName)
            this.setState( {errName: textNameError} );

        //price
        var textPriceError = "";
        if( this.props.workMode != 3 && (isNaN(this.state.price) || this.state.price < 0 || this.state.price == "") )
        {
            textPriceError = "Value must be a number greater than 0";
            isError = true;
        }
        
        if(textPriceError != this.state.errPrice)
            this.setState( {errPrice: textPriceError} );

        //url
        var textUrlError = "";
        if( this.props.workMode != 3 && (this.state.url.indexOf('http://') < 0 || this.state.url == "") )
        {
            textUrlError = "Value shoud have 'http://' ";
            isError = true;
        }
        
        if(textUrlError != this.state.errUrl)
            this.setState( {errUrl: textUrlError} );
        
        //quantity
        var textQuantityError = "";
        if( this.props.workMode != 3 && (isNaN(this.state.quantity) || this.state.quantity < 0 || this.state.quantity == "") )
        {
            textQuantityError = "Value must be a positive integer";
            isError = true;
        }
        
        if(textQuantityError != this.state.errQuantity)
            this.setState( {errQuantity: textQuantityError} );
            
        if(isError != this.state.saveBlocked)
            this.setState( {saveBlocked: isError} );
        
        return isError;
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
        
        this.props.cbBlockTable(true);
    }
    
    render() {

        if (this.props.workMode==0)
            return null;
        
        return (
            <div className='ProductInfo' key={this.props.product.id}>
                <h1> {this.props.headerName ? this.props.headerName : this.props.product.name} </h1>
                <label>
                    <span>ID: {this.props.product.id} </span>
                </label>
                <br/>
                <label>
                    <span className='inputName'>Name: </span>
                    {this.props.workMode==1 && <input type='text' name='InfoName' className='' onChange={this.productChanged} onBlur={this.validData}/>}
                    {this.props.workMode==2 && <input type='text' name='InfoName' className='' onChange={this.productChanged} onBlur={this.validData} value={this.state.name}/>}
                    {this.props.workMode==3 && this.state.name }
                    <span className='error'>{this.state.errName}</span>
                </label>
                <br/>
                <label>
                    <span className='inputName'>Price: </span>
                    {this.props.workMode==1 && <input type='text' name='InfoPrice' className='' onChange={this.productChanged} onBlur={this.validData}/>}
                    {this.props.workMode==2 && <input type='text' name='InfoPrice' className='' onChange={this.productChanged} onBlur={this.validData} value={this.state.price}/>}
                    {this.props.workMode==3 && this.state.price }
                    <span className='error'>{this.state.errPrice}</span>
                </label>
                <br/>
                <label>
                    <span className='inputName'>Url: </span>
                    {this.props.workMode==1 && <input type='text' name='InfoUrl' className='' onChange={this.productChanged} onBlur={this.validData}/>}
                    {this.props.workMode==2 && <input type='text' name='InfoUrl' className='' onChange={this.productChanged} onBlur={this.validData} value={this.state.url}/>}
                    {this.props.workMode==3 && this.state.url }
                    <span className='error'>{this.state.errUrl}</span>
                </label>
                <br/>
                <label>
                    <span className='inputName'>Quantity: </span>
                    {this.props.workMode==1 && <input type='text' name='InfoQuantity' className='' onChange={this.productChanged} onBlur={this.validData}/>}
                    {this.props.workMode==2 && <input type='text' name='InfoQuantity' className='' onChange={this.productChanged} onBlur={this.validData} value={this.state.quantity}/>}
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

export default ProductInfo;
