Router.map(function () {
    this.route('home', {
        path: '/',
        data: function () {
//            Meteor.call('crawlCategories');
        }
    });

//    this.route('about');

    this.route('products', {
        path: '/:url/products',
        data: function () {
            var roomName = this.params.url;
            Session.set("companyUrl", this.params.url);
            return {
                params: this.params
            };
        }
    });

    this.route('home', {
        path: '/:url',
        data: function () {
            var roomName = this.params.url;
            Session.set('companyUrl', this.params.url);
            return {
                params: this.params
            };
        }
    });
});