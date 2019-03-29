var ShoppingList = React.createClass({

    displayname: 'ShoppingList',

    propTypes: {
        arOrigProducts: React.PropTypes.array.isRequired,
        ShopName:       React.PropTypes.string.isRequired,
    },

    getInitialState: function() {
        return {
            isSelectedId: '',
            arActualProducts: '',
        };
    },

    isProductDeleted: function(value) { 
        console.log('ShoppingList: удален продукт - '+value); 
        //change actual product list
        var arTemp = [];
        this.state.arActualProducts.forEach((elem, index, arr) => {
            if ( elem.id != value ) {
                arTemp.push(elem);
            };
        });
        this.setState( {arActualProducts:arTemp} );
    },

    isProductSelected: function(value) { 
        console.log('ShoppingList: продукт выбран - id:'+value);
        this.setState( {isSelectedId:value} );
    },

    render: function() {

        if (!this.state.arActualProducts) {
            this.state.arActualProducts = this.props.arOrigProducts;
        }

        var thead = React.DOM.thead({},
            React.DOM.tr({},
                React.DOM.th({}, 'Name'),
                React.DOM.th({}, 'Cost'),
                React.DOM.th({}, 'Foto'),
                React.DOM.th({}, 'Quantity'),
                React.DOM.th({}, 'Control'),
            ),
        );
        
        var fillList=this.state.arActualProducts.map((elem, index) =>
            React.createElement(ShoppingProduct, {
                key:index,
                id:elem.id,
                iName:elem.name,
                iPrice:elem.cost,
                iUrl:elem.url,
                iQuantity:elem.quantity,
                iSelectedId: this.state.isSelectedId,
                cbProductDeleted:this.isProductDeleted,
                cbProductSelected:this.isProductSelected}
            ),
        );
        
        return React.DOM.div( {className:'ShoppingList'}, 
            React.DOM.h1(null, 'Интернет магазин ' +this.props.ShopName ),
            React.DOM.table({className:'table'}, 
                thead,
                React.DOM.tbody( {className:'isbody'}, fillList ),
            ),        
        );
    },
});