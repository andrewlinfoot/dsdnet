Router.map(function () {
    this.route('home', {
        path: '/',
        data: function () {

        }
    });

    this.route('trigger_crawl', {
      path: '/startcrawl',
      data : function(){
        Meteor.call('startCrawl');
      }
    });

    this.route('add_categories', {
      path: '/addcategories',
      data : function(){
        Meteor.call('addCategories');
      }
    });
    this.route('preheat_oven', {
      path: '/preheat',
      data: function(){
        Meteor.call('preheat');
      }
    });

    this.route('companyProducts', {
        path: '/company',
        template: 'products',
        waitOn: function () {
          var options = {
            category: null
          };
          return Meteor.subscribe('products', options);
        }
    });
});

// Scroll to top fix for iron-router
Deps.autorun(function () {
  var current = Router.current();

  Deps.afterFlush(function () {
    $(window).scrollTop(0);
  });
});
