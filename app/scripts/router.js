var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    ':cat/(:post)': 'parseSlug',
  },
  index: function(){
    this.current = 'index';
  },
  parseSlug: function(cat, post){
      this.currentCat = cat;
      this.currentPost = post;
  }
});

module.exports = new Router();
