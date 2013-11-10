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

    this.route('companyProducts', {
        path: '/:companySlug/:categorySlug',
        template: 'products',
        waitOn: function () {
            var companySlug = this.params.companySlug;
            var categorySlug = this.params.categorySlug;
            return [ Meteor.subscribe('categoryProducts', companySlug, categorySlug),
                     Meteor.subscribe('categoryList', companySlug, categorySlug),
                     Meteor.subscribe('company', companySlug) ];
        },
        data: function () {
            var companySlug = this.params.companySlug;
            Session.set('currentCompanySlug', companySlug);
            Session.set('searchQuery', undefined);
            return {
                params: this.params
            };
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