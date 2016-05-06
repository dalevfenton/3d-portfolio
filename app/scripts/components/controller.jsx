var Backbone = require('backbone');
var React = require('react');
var $ = require('jquery');
var _ = require('underscore');


var DisplayFace = require('./displayface.jsx');
//convert degrees to radians for trig function
function getTanDeg(deg) {
  var rad = deg * Math.PI/180;
  return Math.tan(rad);
}

var Controller = React.createClass({
  getInitialState: function(){
    return {
      faceSize: window.innerWidth*.8,
      facing: 0
    }
  },
  componentWillMount: function(){
    window.onresize = this.resetSize;
    this.props.router.on('route', this.handleRoute);
    this.handleRoute();
  },
  handleRoute: function(e){
    var found;
    var currentPost = _.find(this.props.posts, function(post, index){
      if(post.slug === this.props.router.current){
        found = index;
        return true;
      }
      return false;
    }.bind(this));
    this.setState({facing: found});
  },
  resetSize: function(e){
    // console.log(e);
    this.setState({faceSize: window.innerWidth*.8});
  },
  doRotation: function(i, e){
    e.preventDefault();
    Backbone.history.navigate(this.props.posts[i].slug, {trigger: true});
    // this.setState({facing: i});
  },
  render: function(){
    var faces = [];
    var buttons = [];
    //angle is used to rotate the faces around the center of the overall layout
    var angle = 360 / this.props.posts.length;
    //offsetZ sets the origin point to rotate around
    var offsetZ = -(this.state.faceSize/2) / Math.abs( getTanDeg(angle/2) );
    //inline styles for JSX elements
    var offsetStyle = { transformOrigin: "50% 0 " + offsetZ + "px" };
    var sizeStyle = {width: this.state.faceSize + "px"};
    var displayStyle = { transform: "translateZ(-500px)" + "rotateY(-" + this.state.facing * angle + "deg)" };
    displayStyle = $.extend({}, offsetStyle, displayStyle );
    //build JSX for faces divs & button elements
    for(var i=0; i < this.props.posts.length; i++ ){
      var faceStyle = $.extend( {}, offsetStyle, sizeStyle, {transform: "rotateY(" + angle*i + "deg)" });
      var face = (
        <div className={"display-face face-"+i} key={i}
          style={ faceStyle }>
          <DisplayFace post={this.props.posts[i]} index={i} />
        </div>
      );
      var button = (
        <button onClick={this.doRotation.bind(this, i)} key={i}>{this.props.posts[i].title.rendered}</button>
      );
      faces.push(face);
      buttons.push(button)
    }
    return (
      <div>
        <div id="sidebar">
          {buttons}
        </div>
        <div id="stage" style={sizeStyle}>
          <div id="display" style={displayStyle}>
            {faces}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Controller;
