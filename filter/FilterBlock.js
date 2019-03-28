var FilterBlock = React.createClass({

    displayname: 'FilterBlock',

    propTypes: {
      arWordsList : React.PropTypes.array,
    },

    getInitialState: function() {
        return { 
            isSort: false,
            searchText: '',
        };
    },
   
isSortClicked: function(value) { 
    console.log('FilterBlock: порядок изменен - '+value); 
    this.setState( {isSort:value} );
  },

textChanged: function(value) { 
    console.log('FilterBlock: текст поиска изменён - '+value); 
    this.setState( {searchText:value} );
  },

resetSettingsClicked: function() {
    console.log('FilterBlock: сброс выполнен' ); 
    this.setState( {isSort: false, searchText:""} );
 },
    
    render: function() {  
      return React.DOM.div( {className:'FilterBlock'}, 
        React.createElement(FilterCondition, {
          isSort:this.state.isSort,
          searchText:this.state.searchText,
          cbSort:this.isSortClicked,
          cbTextChanged:this.textChanged,
          cbResetSettings:this.resetSettingsClicked}
        ),
        React.createElement(FilterList, { 
          arWordsList:this.props.arWordsList,
          isSearchText:this.state.searchText,
          isSort:this.state.isSort}
        ),
      );
    },
});
