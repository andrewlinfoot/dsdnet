Crawl = {};

Crawl.categories = function () {
    var categoriesUrl = 'http://12.192.21.195/netlinkcatalog/asp/contentspane.asp?itcat=0100&open=1#0100';
    HTTP.get(categoriesUrl, function (error, result) {
        var $document = $(result.content);
    });
};

Crawl.listings = function (listingUrl) {
    //hardcoded for now
    listingUrl = 'http://12.192.21.195/netlinkcatalog/asp/cucbookresult.asp?itcat=0110&itdesc=%26nbsp%3B%26nbsp%3B%26nbsp%3B%26nbsp%3BBUTTER%26nbsp%3BSOLIDS%26nbsp%3B%26%2338%3B%26nbsp%3BLIQUIDS';

    HTTP.get(listingUrl, {
        headers: {
            Cookie: "ASPSESSIONIDSCTRQTSS=GFLFAHJBCKLBCMMMKEIDKEBP"
        }
    }, function (error, result) {
        var $document = $(result.content);

        var rows = $document.find('.clsGRID tr:not(:first-child)');

        for (var i = 0; i < rows.length; i++) {
            var row = rows.eq(i);

            var itemNumber = $(row.find('td')[1]).find('a').text();
            var brand = $(row.find('td')[2]).text();
            var pack = $(row.find('td')[3]).text();
            var description = $(row.find('td')[4]).text();

            console.log(itemNumber, brand, pack, description);
        }
    });
};