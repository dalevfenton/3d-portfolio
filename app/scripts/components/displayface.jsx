var React = require('react');

var DisplayFace = React.createClass({
  render: function(){
    // var re = /&[^\s]*;/;
    // var matches = this.props.post.content.rendered.match(re);
    // console.log('matches: ', matches);
    // var images = this.props.post.img_links.map(function(img, index){
    //   return ( <img className="display-face-img" src={img.medium_large[0]} key={index} /> );
    // });
    //
    // <div className="display-face-category"
    //   dangerouslySetInnerHTML={{__html: this.props.post.cat_rendered[0].cat_name}} />
    var live;
    var source;
    if(this.props.post.dvf_live_page){
      live = (<a className="nav-button nav-live" href={this.props.post.dvf_live_page} target="_blank">View Live Page</a>);
      source = (<a className="nav-button nav-source" href={this.props.post.dvf_source_page} target="_blank">View Source Code</a>);
    }
    var imageSRC = this.props.post.img_links[0].medium[0];
    if(this.props.post.featured_media !== this.props.post.img_links[0].ID){
      for(var i=0; i<this.props.post.img_links.length; i++){
        if(this.props.post.featured_media === this.props.post.img_links[i].ID){
          imageSRC = this.props.post.img_links[i].medium[0];
        }
      }
    }
    return (
      <div className="display-face-inner">

        <div className="display-face-content-overlay">
          <div className="display-face-navigation">
            <a className="nav-button nav-prev" href={"#" + this.props.post.cat_rendered[0].category_nicename + "/" + this.props.prev.slug}>&lt;&lt; Previous Project</a>
            <a className="nav-button nav-next" href={"#" + this.props.post.cat_rendered[0].category_nicename + "/" + this.props.next.slug}>Next Project &gt;&gt;</a>
          </div>
          <div className="title-container">
            <h1 className="display-face-title"
              dangerouslySetInnerHTML={{__html: this.props.post.title.rendered}} />

          </div>
          <div className="display-face-content"
            dangerouslySetInnerHTML={{__html: this.props.post.content.rendered}} />
            <div className="display-image-holder">
              <div className="display-image-inner">
                <img src={imageSRC} />
              </div>
            </div>
            <div className="display-face-links">
              {live}
              {source}
            </div>
        </div>
      </div>
    )
  }
});

module.exports = DisplayFace;
