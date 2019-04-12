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
    
    state = {
        actualSelectedId: 0,
        actualGoodsList: this.props.originGoodsList,
        actualProduct: {},
        headerName: "",
        workMode: 0,
        isTableBlocked: false,   //any product is modified
    }

    addProductForm = (  ) => {
        if (this.state.isTableBlocked) {
            return;
        }
        console.log('Добавление продукта ');

        this.setState( {headerName: ""} );
        this.setState( {headerName: this.props.headerName.add} );
        this.setState( {buttonName: "Add"} );
        this.setState( {actualSelectedId: 0} );
        this.setState( {workMode: 1} );
    }

    editProductForm = ( productId ) => {  
        console.log('Изменение продукта - ' + productId); 

        let tempGoodsList = this.state.actualGoodsList.slice(); // make a copy

        tempGoodsList.forEach((product, index, arr) => {
            if ( product.id == productId ) {
                this.setState( (prevState, props) => { return {headerName: this.props.headerName.edit}; } ); 
                this.setState( (prevState, props) => { return {buttonName: "Save"}; } ); 
                this.setState( (prevState, props) => { return {actualProduct: product}; } ); 
                this.setState( (prevState, props) => { return {actualSelectedId: productId}; } ); 
                this.setState( (prevState, props) => { return {workMode: 2}; } );
                return;
            };
        });
    }

    selectProductForm = ( productId ) => {  
        console.log('Выбор продукта - ' + productId);

        let tempGoodsList = this.state.actualGoodsList.slice(); // make a copy

        tempGoodsList.forEach((product, index, arr) => {
            if ( product.id == productId ) {
                this.setState( {headerName: product.name} );
                this.setState( {actualProduct: product} );
                this.setState( {actualSelectedId: productId} );
                this.setState( {workMode: 3} );
                return;
            };
        });
    }

    productDeleted = ( productId ) => {
        console.log('Продукт удален - ' + productId); 
        
        //change actual product list
        let tempGoodsList = this.state.actualGoodsList.slice(); // make a copy

        tempGoodsList.filter((product, index, arr) => {
            product.id != productId;
        });

        this.setState( {actualGoodsList: tempGoodsList} );
        this.setState( {workMode: 0} );
    }

    productSaved = ( NewProductData ) => {

        let tempGoodsList = this.state.actualGoodsList.slice(); // make a copy

        if (this.state.workMode == 1) {         //Add
            console.log('Продукт добавлен - ' + NewProductData.id); 
            tempGoodsList.push(NewProductData);
        }
        else if(this.state.workMode == 2) {     //Edit
            console.log('Продукт изменен - ' + NewProductData.id); 
            tempGoodsList.forEach((product, index, arr) => {
                if ( product.id == NewProductData.id ) {
                    tempGoodsList[index] = NewProductData;
                }

            });
        }
        this.setState( {actualSelectedId: NewProductData.id} );
        this.setState( {workMode: 0} );
        this.setState( {actualGoodsList: tempGoodsList} );
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

        return (
            <div>
                <div className='ShoppingList'>
                    <h1>Интернет магазин: {this.props.shopName}</h1>
                    <table className="table">
                        <thead><tr><th>Name</th><th>Price</th><th>Foto</th><th>Quantity</th><th>Control</th></tr></thead>
                        <tbody>{goods}</tbody>
                    </table>
                    <input className='AddButton' type='button' value='Add' onClick={this.addProductForm} disabled={this.state.isTableBlocked}/>
                </div>
                <br/>
                <ProductInfo
                workMode={this.state.workMode}
                id={this.state.workMode == 1 ? this.state.actualGoodsList.length + 1 : this.state.actualProduct.id}
                name={this.state.actualProduct.name} 
                price={this.state.actualProduct.price}
                url={this.state.actualProduct.url}
                quantity={this.state.actualProduct.quantity}
                headerName={this.state.headerName}    
                cbDataSave={this.productSaved}
                cbDataCancel={this.productCanceled}
                cbBlockTable={this.tableBlocked}
                product={this.state.actualProduct}
                />
            </div>
        );
    }
}

export default ShoppingList;