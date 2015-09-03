var React = require('react');

var Table = require('./table.jsx');

var collection = Array(100000+1).join(0).split('').map(function(x, index){return index;});

var App = React.createClass({

  render: function() {

    var mapper = function(x){
      return <div className='row'>{x}</div>;
    };

    return (
      <div className='wrapper' >
        <Table
          className='table'
          collection={collection}
          mapFunction={mapper}
          offset={2}
          />
      </div>
    );
  }

});

module.exports = function(target){
  React.render(<App/>, target);
};
