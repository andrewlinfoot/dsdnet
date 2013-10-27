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

//    this.route('about');

    this.route('products', {
        path: '/:url/products',
        // waitOn: function () {
        //     var :slug
        // },
        data: function () {
            var roomName = this.params.url;
            Session.set("currentCompanyUrl", this.params.url);
            return {
                params: this.params
            };
        }
    });

    this.route('companyProducts', {
        path: '/company/:companySlug/:categorySlug',
        template: 'products',
        // waitOn: function () {
        //     var companySlug = this.params.companySlug;
        //     var categorySlug = this.params.categorySlug;

        //     return [ Meteor.subscribe('categoryProducts',categorySlug),
        //              Meteor.subscribe('categoryList', companySlug, categorySlug) ];
        // },
        data: function () {
            var companySlug = this.params.companySlug;
            Session.set('currentCompanyUrl', companySlug);
            return {
                params: this.params
            };
        }
    });

    this.route('company', {
        path: '/company/:companySlug',
        template: 'company',
        waitOn: function () {
            var companySlug = this.params.companySlug;
            return Meteor.subscribe('currentCompany', companySlug);
        },
        data: function () {
            var companySlug = this.params.companySlug;
            Session.set('currentCompanyUrl', companySlug);
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