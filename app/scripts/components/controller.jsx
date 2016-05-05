var React = require('react');
var $ = require('jquery');

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
  },
  resetSize: function(e){
    // console.log(e);
    this.setState({faceSize: window.innerWidth*.8});
  },
  doRotation: function(i, e){
    e.preventDefault();
    this.setState({facing: i});
  },
  render: function(){
    var faces = [];
    var buttons = [];
    console.log(window);
    //angle is used to rotate the faces around the center of the overall layout
    var angle = 360 / this.props.posts.length;
    //offsetZ sets the origin point to rotate around
    var offsetZ = -(this.state.faceSize/2) / Math.abs( getTanDeg(angle/2) );
    //inline styles for JSX elements
    var offsetStyle = { transformOrigin: "50% 0 " + offsetZ + "px" };
    var sizeStyle = {width: this.state.faceSize + "px", height: this.state.faceSize + "px" };
    var displayStyle = { transform: "translateZ(-500px)" + "rotateY(-" + this.state.facing * angle + "deg)" };
    displayStyle = $.extend({}, offsetStyle, displayStyle );
    //build JSX for faces divs & button elements
    for(var i=0; i < this.props.posts.length; i++ ){
      var faceStyle = $.extend( {}, offsetStyle, sizeStyle, {transform: "rotateY(" + angle*i + "deg)" });
      var face = (
        <div className={"display-face face-"+i} key={i}
          style={ faceStyle }>
          <img src={this.props.posts[i].img_links[0].thumbnail[0]} />
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
