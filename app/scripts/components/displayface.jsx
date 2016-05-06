var React = require('react');

var DisplayFace = React.createClass({
  render: function(){
    // var re = /&[^\s]*;/;
    // var matches = this.props.post.content.rendered.match(re);
    // console.log('matches: ', matches);
    // var images = this.props.post.img_links.map(function(img, index){
    //   return ( <img className="display-face-img" src={img.medium_large[0]} key={index} /> );
    // });
    // <img className="display-face-img" src={this.props.post.img_links[0].medium_large[0]} />
    return (
      <div className="display-face-inner">

        <div className="display-face-content-overlay">
          <div className="title-container">
            <h1 className="display-face-title"
              dangerouslySetInnerHTML={{__html: this.props.post.title.rendered}} />
            <div className="display-face-category"
              dangerouslySetInnerHTML={{__html: this.props.post.cat_rendered[0].cat_name}} />
          </div>
          <div className="display-face-content"
            dangerouslySetInnerHTML={{__html: this.props.post.content.rendered}} />
          <div className="display-face-links">
            <a href={this.props.post.dvf_live_page} target="_blank">View Live Page</a>
            <a href={this.props.post.dvf_source_page} target="_blank">View Source Code</a>
          </div>
          <div className="display-face-navigation">
            <a className="nav-button nav-prev" href={"#" + this.props.prev.slug}>Previous Project</a>
            <a className="nav-button nav-next" href={"#" + this.props.next.slug}>Next Project</a>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = DisplayFace;
