var React = require('react');

var DisplayFace = React.createClass({
  render: function(){
    return (
      <div className="display-face-inner">
        <img src={this.props.post.img_links[0].thumbnail[0]} />
        <a href={"#" + this.props.post.slug} >{this.props.post.title.rendered}</a>
      </div>
    )
  }
});

module.exports = DisplayFace;
