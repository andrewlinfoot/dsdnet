Router.map(function () {
    this.route('home', {path: '/'});

//    this.route('about');

    this.route('store', {
        path: '/:name',
        data: function () {
            var roomName = this.params.name;
            Session.set("companyName", this.params.name);
            return {
                params: this.params
            };
        }
    });
});