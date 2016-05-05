var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '(:slug)': 'parseSlug',
  },
  index: function(){
    this.current = 'index';
  },
  parseSlug: function(slug){
    if(slug){
      this.current = slug;
    }else{
      this.current = null;
    }

  }
});

module.exports = new Router();
