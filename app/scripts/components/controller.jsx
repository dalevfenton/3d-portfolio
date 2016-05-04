var React = require('react');
var $ = require('jquery');

function getTanDeg(deg) {
  var rad = deg * Math.PI/180;
  return Math.tan(rad);
}

var Controller = React.createClass({
  getInitialState: function(){
    return {
      numFaces: 3,
      facing: 0
    }
  },
  addFace: function(e){
    e.preventDefault();
    this.setState({numFaces: this.state.numFaces + 1 });
  },
  doRotation: function(i, e){
    e.preventDefault();
    this.setState({facing: i});
  },
  render: function(){
    var faces = [];
    var buttons = [];
    //angle is used to rotate the faces around the center of the overall layout
    var angle = 360 / this.state.numFaces;
    //offsetZ sets the origin point to rotate around
    var offsetZ = -150 / Math.abs( getTanDeg(angle/2) );
    //inline styles for JSX elements
    var offsetStyle = { transformOrigin: "50% 0 " + offsetZ + "px" };
    var displayStyle = { transform: "translateZ(-500px)" + "rotateY(-" + this.state.facing * angle + "deg)" };
    displayStyle = $.extend({}, offsetStyle, displayStyle );
    //build JSX for faces divs & button elements
    for(var i=0; i < this.state.numFaces; i++ ){
      var faceStyle = $.extend( {}, offsetStyle, {transform: "rotateY(" + angle*i + "deg)" });
      var face = (
        <div className={"display-face face-"+i} key={i}
          style={ faceStyle }>
          {"Face #" + i}
        </div>
      );
      var button = (
        <button onClick={this.doRotation.bind(this, i)} key={i}>{"Face #" + i}</button>
      );
      faces.push(face);
      buttons.push(button)
    }
    return (
      <div>
        <div id="sidebar">
          <button onClick={this.addFace}>Add Face</button>
          {buttons}
        </div>
        <div id="stage">
          <div id="display" style={displayStyle}>
            {faces}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Controller;
