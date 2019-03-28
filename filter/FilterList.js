var FilterList = React.createClass({

    displayname: 'FilterList',

    propTypes: {
        arWordsList:    React.PropTypes.array,
        isSearchText:   React.PropTypes.string.isRequired,
        isSort:         React.PropTypes.bool.isRequired
    },

    render: function() {
        var selectedWords = [];
        var data = this.props.arWordsList;
        
        //find search text
        data.forEach((elem, index, arr) => {
            if ( this.props.isSearchText == "" || elem.indexOf(this.props.isSearchText) >= 0 ) {
                selectedWords.push(elem);
            };
        });

        //sort
        this.props.isSort ? selectedWords.sort() : null;

        //add <option>
        selectedWords=selectedWords.map((elem, index) =>
            React.DOM.option({key:index},elem)
        );

        return React.DOM.div( {className: 'FilterList'},
            React.DOM.select({size: '5'}, selectedWords),
        );
    },
});
