var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    ':cat/(:post)': 'parseSlug',
  },
  index: function(){
    this.current = 'index';
  },
  parseSlug: function(cat, post){
    if(cat){
      this.currentCat = cat;
      this.currentPost = post;
    }else if(post){
      this.currentCat = cat;
      this.currentPost = null;
    }
  }
});

module.exports = new Router();
