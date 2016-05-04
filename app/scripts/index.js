var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Controller = require('./components/controller.jsx');

var apiURL = 'http://dalefenton.com/wp-json/wp/v2/posts';
$.ajax(apiURL).then(function(data){
  console.log(data);
}, function(error){
  console.log(error);
});
ReactDOM.render(
  React.createElement( Controller, {} ),
  document.getElementById('app')
);
