Router.map(function () {
    this.route('home', {
        path: '/',
        data: function () {
//            Meteor.call('crawlCategories');
        }
    });

//    this.route('about');

    this.route('products', {
        path: '/:name/products',
        data: function () {
            var roomName = this.params.name;
            Session.set("companyName", this.params.name);
            return {
                params: this.params
            };
        }
    });

    this.route('home', {
        path: '/:name',
        data: function () {
            var roomName = this.params.name;
            Session.set('companyName', this.params.name);
            return {
                params: this.params
            };
        }
    });
});