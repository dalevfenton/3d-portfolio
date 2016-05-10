var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var DisplayFace = require('./displayface.jsx');

function degToRad(deg){
  return deg * Math.PI / 180;
}

var DisplayPod = React.createClass({
  getInitialState: function(){
    return {
      facing: null
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

    if(found !== undefined){
      // if(this.state.facing === null){
      //   console.log('facing not set, setting directly to ' + found);
      //   this.setState({facing: found});
      //   return;
      // }
      // console.log('this.state.facing is: ', this.state.facing);
      // var facing = this.state.facing % this.props.posts.length-1;
      //
      // console.log('found: ' + found);
      // console.log('facing pre-filter: ' + facing);
      // if(Math.abs(found - facing) === 1){
      //   facing += found - facing;
      // }else if(found === 0 && facing === this.props.posts.length-1){
      //   facing += 1;
      // }else if(found === this.props.posts.length-1 && facing === 0){
      //   facing -= 1;
      // }
      // console.log(facing);
      this.setState({facing: found});
    }
    // else if(!this.state.facing){
    //   this.setState({facing: 0});
    // }
  },
  render: function(){
    var faces = [];
    var buttons = [];
    var catPanels = [];
    //angle is used to rotate the faces around the center of the overall layout
    var angle = 360 / this.props.posts.length;
    //offsetZ sets the origin point to rotate around
    var offsetZ = -(this.props.faceSize/2) / Math.abs( Math.tan(degToRad(angle/2)) );
    var offsetX = -1;
    if(this.props.index % 2 === 0){
      offsetX = 1;
    }
    //inline style object definitions for various JSX elements
    var offsetStyle = { transformOrigin: "50% 0 " + offsetZ + "px" };
    var sizeStyle = {width: this.props.faceSize + "px"};

    //setup style definition for the .display element
    // this has translateZ set to -500px for the active pod,
    // and other pods offset in X and Z dimensions
    // we also set the rotation around the Y axis
    // based on the currently selected face
    var displayStyle = { transform: "translateZ(-500px)" +
      "rotateY(" + -1*((this.state.facing * angle)+5) + "deg)" };
    if(this.props.activePod !== this.props.index){
      displayStyle = $.extend({}, displayStyle,
        { transform:
          " translateY(" + ( -1600 ) + "px)" +
          " rotateY(" + -1*((this.state.facing * angle)+5)+ "deg)"} );
    }
    displayStyle = $.extend({}, offsetStyle, displayStyle );

    //build JSX for faces divs & button elements
    for(var i=0; i < this.props.posts.length; i++ ){
      var faceStyle = $.extend( {}, offsetStyle, sizeStyle, {transform: "rotateY(" + angle*i + "deg)" });
      if(this.props.posts.length < 3){
        faceStyle = $.extend({}, faceStyle, {transform: "rotateY(" + angle*i + "deg)" + "translateZ(50px)" } );
      }
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
      faces.push(face);
    }


    //test run at trying to implement a rotating banner around the pod (work on later)
    // var polyRad = this.props.faceSize / (2 * Math.sin(degToRad(180 / this.props.posts.length )));
    // var offsetRad = (polyRad + 50) *-1;
    // var panelAngle = 360 / (this.props.posts.length*2);
    // var panelOrigin = { transformOrigin: "50% 0 " + offsetRad + "px" };
    // for(var j=0; j < this.props.posts.length*2; j++){
    //   var catPanelStyle = $.extend({}, panelOrigin, {
    //     transformOrigin: "50% 0 " + (offsetRad - 100)+ "px",
    //     width: this.props.faceSize/2 + "px",
    //     transform: "rotateY(" + panelAngle*j + "deg)"
    //   });
    //   var panel = (
    //     <div className={"display-cat-panel cat-panel"+j} key={j} style={catPanelStyle}>
    //       {this.props.posts[0].cat_rendered[0].cat_name}
    //     </div>
    //   );
    //   catPanels.push(panel);
    // }
    // <div className="test-center" style={panelOrigin}>center</div>
    // <div className="display-cat-ring" style={{transformOrigin: "50% 0 " + offsetZ + "px"}}>
    //
    //   {catPanels}
    // </div>
    return (
      <div className={"display display-"+ this.props.index} style={displayStyle}>
        {faces}
      </div>
    )
  }
});

module.exports = DisplayPod;
