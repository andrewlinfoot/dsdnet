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
        path: '/:companySlug',
        template: 'products',
        waitOn: function () {
          var companySlug = this.params.companySlug;
          return [
            Meteor.subscribe('company', {companySlug: companySlug}),
            Meteor.subscribe('categories', {type: 'family', companySlug: companySlug})
          ];
        },
        before: function () {
          //when refreshing the page, this doesnt set before
          //products subscription is called, not sure why
          Session.set('companySlug', this.params.companySlug);
        },
        data: function () {
          return Companies.findOne();
        }
    });

    this.route('gtin', {
      path: '/gtin/:gtin',
      template: 'productListing',
      waitOn: function () {
        return Meteor.subscribe('productListing', {
          gtin: this.params.gtin
        });
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
