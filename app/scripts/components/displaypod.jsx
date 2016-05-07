var React = require('react');
var $ = require('jquery');
var _ = require('underscore');

var DisplayFace = require('./displayface.jsx');

function getTanDeg(deg) {
  var rad = deg * Math.PI/180;
  return Math.tan(rad);
}

var DisplayPod = React.createClass({
  getInitialState: function(){
    return {
      facing: 0
    }
  },
  componentWillMount: function(){
    this.props.router.on('route', this.setFacing);
    this.setFacing();
  },
  setFacing: function(){
    var found;
    var currentCat = _.find(this.props.posts, function(post, index){
      if(post.slug === this.props.router.currentPost){
        found = index;
        return true;
      }
      return false;
    }.bind(this));
    if(!found){
      found = 0;
    }
    this.setState({facing: found});
  },
  render: function(){
    var faces = [];
    var buttons = [];
    //angle is used to rotate the faces around the center of the overall layout
    var angle = 360 / this.props.posts.length;
    //offsetZ sets the origin point to rotate around
    var offsetZ = -(this.props.faceSize/2) / Math.abs( getTanDeg(angle/2) );
    // console.log(this.props);
    var displayStyle = { transform: "translateZ(-500px)" + "rotateY(-" + this.state.facing * angle + "deg)" };
    console.log(this.props);
    if(this.props.activePod !== this.props.index){
      console.log('activePod is index #' + this.props.index);
      displayStyle = $.extend({}, displayStyle,
        { transform: "translateZ(-" + (8000 * (this.props.index + 1)) + "px)" +
          " translateX(-" + (8000 * (this.props.index + 1)) + "px)" +
          " rotateY(-" + (this.state.facing * angle) + "deg)"} );
        console.log(displayStyle);
    }

    //inline styles for JSX elements
    var offsetStyle = { transformOrigin: "50% 0 " + offsetZ + "px" };
    var sizeStyle = {width: this.props.faceSize + "px"};
    displayStyle = $.extend({}, offsetStyle, displayStyle );
    //build JSX for faces divs & button elements
    for(var i=0; i < this.props.posts.length; i++ ){
      var faceStyle = $.extend( {}, offsetStyle, sizeStyle, {transform: "rotateY(" + angle*i + "deg)" });
      var next = this.props.posts[i+1];
      var prev = this.props.posts[i-1];
      if(i===0){
        prev = this.props.posts[this.props.posts.length-1];
      }
      if(i===this.props.posts.length-1){
        next = this.props.posts[0];
      }
      var face = (
        <div className={"display-face face-"+i} key={i}
          style={ faceStyle }>
          <DisplayFace post={this.props.posts[i]}
            index={i} next={next} prev={prev} />
        </div>
      );
      // var button = (
      //   <button onClick={this.doRotation.bind(this, i)} key={i}>{this.props.posts[i].title.rendered}</button>
      // );
      faces.push(face);
      // buttons.push(button)
    }
    return (
      <div className={"display display-"+ this.props.index} style={displayStyle}>
        {faces}
      </div>
    )
  }
});

module.exports = DisplayPod;
