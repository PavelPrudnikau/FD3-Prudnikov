import React from 'react';
import PropTypes from 'prop-types';

import './ShoppingList.css';


import ShoppingProduct from './ShoppingProduct';
import ProductInfo from './ProductInfo';

class ShoppingList extends React.Component {

    static propTypes = {
        shopName:        PropTypes.string.isRequired,
        originGoodsList: PropTypes.array.isRequired,
        headerName:      PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {  actualGoodsList: this.props.originGoodsList,
                        actualSelectedId: 0,
                        actualProduct: {},
                        headerName: "",
                        workMode: 0,  //1 - add product, 2 - edit product, 3 - select product
                        isTableBlocked: false,
                        LastId: this.props.originGoodsList.length,
                    };
       }
   
    addProductForm = (  ) => {
        console.log('Добавление продукта ');
       
        this.setState({ 
            headerName: this.props.headerName.add,
            buttonName: "Add",
            actualSelectedId: 0,
            workMode: 1,
        });
    }

    editProductForm = ( productId ) => {  
        console.log('Изменение продукта - ' + productId); 

        this.setState({ 
            actualSelectedId: productId,
            workMode: 2,
            headerName: this.props.headerName.edit,
            buttonName: "Save",
        });
    }

    selectProductForm = ( selectedId ) => {  
        console.log('Выбран продукт - ' + selectedId);

        this.setState({ 
            actualSelectedId: selectedId,
            workMode: 3,
            headerName: "",
        });
    }

    productDeleted = ( productId ) => {
        console.log('Продукт удален - ' + productId); 
        
        //change actual product list
        var tempGoodsList = [];
        this.state.actualGoodsList.forEach((elem, index, arr) => {
            if ( elem.id != productId ) {
                tempGoodsList.push(elem);
            };
        });

        this.setState( {actualGoodsList: tempGoodsList} );
        this.setState( {workMode: 0} );
    }

    productSaved = ( NewProduct ) => {

        let tempGoodsList = this.state.actualGoodsList.slice(); // make a copy

        if (this.state.workMode == 1) {         //Add
            console.log('Продукт добавлен - ' + NewProduct.id); 
            tempGoodsList.push(NewProduct);
            this.setState({ 
                actualGoodsList: tempGoodsList,
                actualSelectedId: NewProduct.id,
                workMode: 0,
                LastId: NewProduct.id,
            });       
            return;     
        }
        else if(this.state.workMode == 2) {     //Edit
            console.log('Продукт изменен - ' + NewProduct.id);

            tempGoodsList = tempGoodsList.map( product  => {
                if (product.id != NewProduct.id)
                    return product;
                else
                    return NewProduct;
            });
            this.setState({ 
                actualGoodsList: tempGoodsList,
                actualSelectedId: NewProduct.id,
                workMode: 0,
            });               
        }

    }

    productCanceled = ( v ) => {     
        this.setState( {workMode: 0} );
    }

    tableBlocked = ( v ) => {
        console.log('Блокировка таблицы ' + v); 
        this.setState( {isTableBlocked: v} );
    }

    render() {
        
        var goods=this.state.actualGoodsList.map( v =>
            <ShoppingProduct 
                key={v.id}
                id={v.id} 
                name={v.name} 
                price={v.price}
                url={v.url} 
                quantity={v.quantity}
                selectedId={this.state.actualSelectedId}
                isBlocked={this.state.isTableBlocked}
                cbDeleted={this.productDeleted}
                cbSelected={this.selectProductForm}
                cbEdit={this.editProductForm}
            />
        );
        //get actual product
        let product;
        if(this.state.workMode!==1) {    //Edit, Select
            product = this.state.actualGoodsList.find( product => { 
                return (product.id == this.state.actualSelectedId);
            });
        }
        else {  //Add
            product = {id: this.state.LastId + 1, name: '', price: '', url: '', quantity: ''}; 
        }
        
        return (
            <div>
                <div className='ShoppingList'>
                    <h1>Интернет магазин: {this.props.shopName}</h1>
                    <table className="table">
                        <thead><tr><th>Name</th><th>Price</th><th>Foto</th><th>Quantity</th><th>Control</th></tr></thead>
                        <tbody>{goods}</tbody>
                    </table>
                    <input className='AddButton' type='button' value='New product' onClick={this.addProductForm} disabled={this.state.isTableBlocked}/>
                </div>
                <br/>
                {this.state.workMode!=0 && 
                    <ProductInfo
                    product={product}
                    workMode={this.state.workMode}
                    headerName={this.state.headerName}
                    cbDataSave={this.productSaved}
                    cbDataCancel={this.productCanceled}
                    cbBlockTable={this.tableBlocked}
                    />
                }
            </div>
        );
    }
}

export default ShoppingList;