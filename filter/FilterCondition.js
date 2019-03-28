var FilterCondition = React.createClass({

    displayname: 'FilterCondition',

    propTypes: {
      isSort:           React.PropTypes.bool.isRequired,
      searchText:       React.PropTypes.string.isRequired,
      cbSort:           React.PropTypes.func.isRequired,
      cbTextChanged:    React.PropTypes.func.isRequired,
      cbResetSettings:  React.PropTypes.func.isRequired,
    },

    isSortClicked: function(EO) { 
        this.props.cbSort(EO.target.checked);
      },
    
    textChanged: function(EO) { 
        this.props.cbTextChanged(EO.target.value);
      },
    
    resetSettingsClicked: function() {
        this.props.cbResetSettings();
    },
    
    render: function() {
        return React.DOM.div( {className: 'FilterCondition'},
            React.DOM.input( {type:'checkbox', checked:this.props.isSort, onClick:this.isSortClicked} ),
            React.DOM.input( {type:'text', value:this.props.searchText, onChange:this.textChanged} ),
            React.DOM.input( {type:'button', value:'Сброс', onClick:this.resetSettingsClicked} ),            
        );
    },
});