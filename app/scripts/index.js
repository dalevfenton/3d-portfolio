var React = require('react');
var ReactDOM = require('react-dom');

var Controller = require('./components/controller.jsx');

ReactDOM.render(
  React.createElement( Controller, {} ),
  document.getElementById('app')
);
