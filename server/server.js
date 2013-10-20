Meteor.methods({
    crawlCategories: function () {
        Crawl.categories();
    },
    crawlListings: function () {
        Crawl.listings();
    }
});