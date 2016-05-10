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
    if(!found){
      found = 0;
    }
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

    var pods = _.map( this.categories, function(category, index){
      var className = "cat-nav-button";
      if(this.state.activePod === index){
        className += " active";
      }
      var button = ( <a className={className} key={index} href={"#" + category[0].cat_rendered[0].category_nicename + "/"}>
        {category[0].cat_rendered[0].cat_name}
      </a> );
      buttons.push(button);

      return ( <DisplayPod posts={category} key={index} index={index}
        faceSize={this.state.faceSize} activePod={this.state.activePod}
        numPods={this.categories.length}
        router={this.props.router} /> );
    }.bind(this));

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
