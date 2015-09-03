var React = require('react');

var table = React.createClass({
  getDefaultProps: function() {
    return {
      offset: 0//how many elements render up and bottom of visible area
    };
  },

  getInitialState: function() {
    return {
      scrollTop: 0,//how far are we from top
      //those will be calclated later from actual size
      tableHeight: 1,
      rowHeight:1
    };
  },

  componentDidMount: function() {
    window.addEventListener('resize', this._handleResize);
    this._calculateSize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this._handleResize);
  },

  _handleResize: function(ev){
    this._calculateSize();
  },

  _calculateSize: function(){
    this.setState({
      tableHeight: React.findDOMNode(this).offsetHeight,
      rowHeight: React.findDOMNode(this).children[1].offsetHeight//checks size of first row(0 is a placeholder)
    });
  },

  render: function() {
    var self = this;
    var collection = this.props.collection;

    var boundaries = this._calculateVisible(this.state.scrollTop);

    console.log(this.state.tableHeight);
    var rows = collection.slice(boundaries.firstVisible, boundaries.lastVisible).map(function(x, index){
        return(
          <div key={boundaries.firstVisible + index}>
             {self.props.mapFunction(x)}
          </div>
        );
      });
    console.log('render', rows.length);
    // console.log(
      // console.log( rows.length * this.state.rowHeight)
      // console.log( boundaries.firstVisible * this.state.rowHeight )
      // console.log( (collection.length - boundaries.lastVisible ) * this.state.rowHeight )
    // );
    // console.log(this.state.rowHeight);
    return (
        <div style={{
          'overflowY': 'scroll'
        }}
          className={this.props.className}
          onScroll={this._handleScroll}
          >
          <div style={{
              height:  (boundaries.firstVisible) * this.state.rowHeight
            }}></div>

          {rows}

          <div style={{
              height: (collection.length - boundaries.lastVisible) * this.state.rowHeight
            }}></div>
        </div>
    );
  },

  _handleScroll: function(e){
    this.setState({scrollTop: e.target.scrollTop});
  },

  _calculateVisible: function(scrollTop){
    console.log('calculate');
    var offset = this.props.offset;
    var first = Math.floor(scrollTop/this.state.rowHeight) - offset;
    var last = Math.ceil( (scrollTop + this.state.tableHeight)/this.state.rowHeight ) + offset;
    var max = this.props.collection.length;
    return({
      firstVisible: first > 0 ? first : 0,
      lastVisible: last < max ? last : max
    });
  }

});

module.exports = table;
