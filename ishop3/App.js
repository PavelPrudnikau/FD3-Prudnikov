"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import ShoppingList from './components/ShoppingList';

let ishopName='Books shop';
let list=require('./components/data.json');
let headers={ edit: 'Edit existing product:', 
              add:  'Add new product:'
            };

ReactDOM.render(
    <ShoppingList 
      shopName={ishopName}
      originGoodsList={list}
      headerName={headers}
    />, 
    document.getElementById('container') 
);
