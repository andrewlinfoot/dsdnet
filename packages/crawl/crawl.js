Crawl = {};
Crawl.options = { headers: {} };
Crawl.startCrawl = function () {
  var cookieUrl = 
    'http://12.192.21.195/netlinkcatalog/asp/cucbook.asp?bunit=1&cuswhs=001';
  var categoriesUrl = 
    'http://12.192.21.195/netlinkcatalog/asp/contentspane.asp?mode=NC';
  var subCategoryUrlTemp = 
    'http://12.192.21.195/netlinkcatalog/asp/contentspane.asp?itcat={0}&open=1#{0}'
  HTTP.get(cookieUrl, function(error, result){
    Crawl.options.headers.Cookie = result.headers['set-cookie'][0];
    HTTP.get(categoriesUrl, 
      Crawl.options,
      function (error, result) {
        var $doc = $(result.content);
        var $menu = $doc.find('.clsMainMenu a :nth-child(3)');
        if($menu.length == 0){
          console.log('no result, check cookie');
          return
        }
        var categories = $menu.map(function(index, element){
          var href = element.href;
          var index = href.indexOf('itcat=');
          var val = href.substring(index +6, index+10);
          return {
            name : element.title.split(':')[1].substring(1),
            subCatUrl : subCategoryUrlTemp.replace(/{(0)}/g, val),
            listingsUrl : href,
            parent : null
          };
        });
        for(var j = 0; j < categories.length; j++){
          var catId = Categories.insert({
            name : categories[j].name,
            parent : null
          });
          Crawl.listings(catId, categories[j].listingsUrl);
          HTTP.get(categories[j].subCatUrl, Crawl.options, function(error, result){
            var $doc = $(result.content);
            var $submenu = $doc.find('.clsMainMenu');
            for( var i = 0; i < $submenu.length; i++){
              var children = $submenu.eq(i).children();
              if(children.length != 3){
                continue;
              }
              var child = children.eq(2);
              var listingsUrl = child.attr('href');
              var catId = Categories.insert({
                name : child.attr('title').split(':')[1].substring(5),
                parent : this.parentCategoryId
              });
              Crawl.listings(catId, listingsUrl);
            }
          }.bind({parentCategoryId : catId}));
        }
      });
  });
};

Crawl.listings = function (CategoryId, listingUrl, lastCrawl) {
  HTTP.get(listingUrl, Crawl.options, function (error, result) {
    var $document = $(result.content);
    if(!lastCrawl){
      $document.find('center').eq(1).find('a').each(function(){
        Crawl.listings(CategoryId, this.href, true);
      });
    }
    var rows = $document.find('.clsGRID tr:not(:first-child)');
    rows.each(function (index, row) {
      var columns = $(row).find('td');

      var itemNumber = columns.eq(1).find('a').text();
      var brand = columns.eq(2).text();
      var pack = columns.eq(3).text();
      var description = columns.eq(4).text();
      Products.insert({
        productNumber : itemNumber,
        brand : brand,
        pack : pack,
        description : description,
        category : CategoryId
      });
    });
  });
};
