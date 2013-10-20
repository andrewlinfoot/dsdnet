Crawl = {};


Crawl.categories = function () {
    var categoriesUrl = "http://12.192.21.195/netlinkcatalog/asp/contentspane.asp?itcat=0100&open=1#0100";
    HTTP.get(categoriesUrl, function (error, result) {
        var $document = $(result.content);
    });
};