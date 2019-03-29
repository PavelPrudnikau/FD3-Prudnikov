var ShoppingProduct = React.createClass({

    displayName: 'ShoppingProduct',
  
    propTypes: {
        id:                 React.PropTypes.number.isRequired,
        iName:              React.PropTypes.string.isRequired,
        iPrice:             React.PropTypes.number.isRequired,
        iUrl:               React.PropTypes.string.isRequired,
        iQuantity:          React.PropTypes.number.isRequired,
        iSelectedId:        React.PropTypes.any.isRequired,
        cbProductDeleted:   React.PropTypes.func.isRequired,
        cbProductSelected:  React.PropTypes.func.isRequired,
    },

    isSelected: function(EO) {
        if (EO.target.className == 'DeleteButton') {
          return;
        }
        else {
          this.props.cbProductSelected(EO.target.parentNode.id);
        }
      },

      buttonIsClicked: function(EO) {
        console.log('ShoppingProduct: клик - '+EO.target.className); 
        var confidence = confirm('Удалить продукт?');
        if (confidence) {
          this.props.cbProductDeleted(EO.target.parentNode.parentNode.id)
        }
      },
      
    render: function() {
        var trClassName;
        this.props.id == this.props.iSelectedId ? trClassName = "selected" : trClassName = "unselected";

        return React.DOM.tr( {className: trClassName, id:this.props.id },
            React.DOM.td( {onClick:this.isSelected}, this.props.iName ),
            React.DOM.td( {onClick:this.isSelected}, this.props.iPrice ),
            React.DOM.td( {onClick:this.isSelected}, this.props.iUrl ),
            React.DOM.td( {onClick:this.isSelected}, this.props.iQuantity ),
            React.DOM.td( {onClick:this.isSelected}, React.DOM.input( {className: 'DeleteButton', type:'button', value:'Delete', onClick:this.buttonIsClicked} ), ),
        );
    },
});