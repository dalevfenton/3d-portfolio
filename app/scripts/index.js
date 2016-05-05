var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');

var router = require('./router');
var Controller = require('./components/controller.jsx');

Backbone.history.start();

var apiURL = 'http://dalefenton.com/wp-json/wp/v2/posts?per_page=50';
$.ajax(apiURL).then(function(data){
  console.log(data);
  ReactDOM.render(
    React.createElement( Controller, {
      posts: data,
      router: router
    } ),
    document.getElementById('app')
  );
}, function(error){
  console.log(error);
});
