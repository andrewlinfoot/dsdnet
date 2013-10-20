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
        rows.each(function (index, row) {
            var columns = $(row).find('td');

            var itemNumber = columns.eq(1).find('a').text();
            var brand = columns.eq(2).text();
            var pack = columns.eq(3).text();
            var description = columns.eq(4).text();

            console.log(itemNumber, brand, pack, description);
        });
    });
};