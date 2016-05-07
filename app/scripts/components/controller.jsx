var Backbone = require('backbone');
var React = require('react');
var $ = require('jquery');
var _ = require('underscore');


var DisplayPod = require('./displaypod.jsx');
//convert degrees to radians for trig function
// function getTanDeg(deg) {
//   var rad = deg * Math.PI/180;
//   return Math.tan(rad);
// }

var Controller = React.createClass({
  getInitialState: function(){
    return {
      faceSize: window.innerWidth*.8,
      facing: 0,
      activePod: 0
    }
  },
  componentWillMount: function(){
    window.onresize = this.resetSize;
    this.props.router.on('route', this.handleRoute);
    var cats = _.groupBy(this.props.posts, function(post){
      return post.cat_rendered[0].cat_name;
    });
    this.categories = _.reduce(cats, function(memo, cat){
      memo.push(cat);
      return memo;
    }, []);
    this.handleRoute();
  },
  handleRoute: function(e){
    var found;
    var currentCat = _.find(this.categories, function(category, index){
      if(category[0].cat_rendered[0].category_nicename === this.props.router.currentCat){
        found = index;
        return true;
      }
      return false;
    }.bind(this));
    this.setState({activePod: found });
  },
  resetSize: function(e){
    // console.log(e);
    this.setState({faceSize: window.innerWidth*.8});
  },
  doRotation: function(i, e){
    e.preventDefault();
    this.setState({activePod: i});
    // Backbone.history.navigate(this.props.posts[i].slug, {trigger: true});
    // this.setState({facing: i});
  },
  render: function(){
    var buttons = [];
    // var cats = _.groupBy(this.props.posts, function(post){
    //   return post.cat_rendered[0].cat_name;
    // });
    //
    // cats = _.reduce(cats, function(memo, cat){
    //   memo.push(cat);
    //   return memo;
    // }, []);

    var pods = _.map( this.categories, function(category, index){
      var button = ( <button onClick={this.doRotation.bind(this, index)}
        key={index}>{category[0].cat_rendered[0].cat_name}</button> );
      buttons.push(button);

      return ( <DisplayPod posts={category} key={index} index={index}
        faceSize={this.state.faceSize} activePod={this.state.activePod}
        router={this.props.router} /> );
    }.bind(this));
    // var faces = [];
    //
    // //angle is used to rotate the faces around the center of the overall layout
    // var angle = 360 / this.props.posts.length;
    // //offsetZ sets the origin point to rotate around
    // var offsetZ = -(this.state.faceSize/2) / Math.abs( getTanDeg(angle/2) );
    // //inline styles for JSX elements
    // var offsetStyle = { transformOrigin: "50% 0 " + offsetZ + "px" };
    // var sizeStyle = {width: this.state.faceSize + "px"};
    // var displayStyle = { transform: "translateZ(-500px)" + "rotateY(-" + this.state.facing * angle + "deg)" };
    // displayStyle = $.extend({}, offsetStyle, displayStyle );
    // //build JSX for faces divs & button elements
    // for(var i=0; i < this.props.posts.length; i++ ){
    //   var faceStyle = $.extend( {}, offsetStyle, sizeStyle, {transform: "rotateY(" + angle*i + "deg)" });
    //   var next = this.props.posts[i+1];
    //   var prev = this.props.posts[i-1];
    //   if(i===0){
    //     prev = this.props.posts[this.props.posts.length-1];
    //   }
    //   if(i===this.props.posts.length-1){
    //     next = this.props.posts[0];
    //   }
    //   var face = (
    //     <div className={"display-face face-"+i} key={i}
    //       style={ faceStyle }>
    //       <DisplayFace post={this.props.posts[i]} index={i} next={next} prev={prev} />
    //     </div>
    //   );
    //   var button = (
    //     <button onClick={this.doRotation.bind(this, i)} key={i}>{this.props.posts[i].title.rendered}</button>
    //   );
    //   faces.push(face);
    //   buttons.push(button)
    // }
    //
    // <div id="stage" style={sizeStyle}>
    //   <div id="display" style={displayStyle}>
    //     {faces}
    //   </div>
    // </div>
    var sizeStyle = {width: this.state.faceSize + "px"};
    return (
      <div>
        <div id="sidebar">
          {buttons}
        </div>
        <div className="stage" style={sizeStyle}>
          {pods}
        </div>
      </div>
    )
  }
});

module.exports = Controller;
