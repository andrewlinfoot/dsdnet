Crawl = {};
Options = { headers: {} };
CookieUrl = 
  'http://12.192.21.195/netlinkcatalog/asp/cucbook.asp?bunit=1&cuswhs=001';
CategoriesUrl = 
  'http://12.192.21.195/netlinkcatalog/asp/contentspane.asp?mode=NC';
SubCategoryUrlTemp = 
  'http://12.192.21.195/netlinkcatalog/asp/contentspane.asp?itcat={0}&open=1#{0}';
//start crawling McFarlings 
CrawlMcFarlings = function () {
  console.log('Starting Crawl: McFarling Foods');
  //grab the cookie
  HTTP.get(CookieUrl, function(error, result){
    Options.headers.Cookie = result.headers['set-cookie'][0];
    //start crawling rootCategories
    GetCategories();
  });
}

FindAndUpdate = function(collection, options){
  var id = collection.findOne(options.query, { _id: true })
  if(id){
    collection.update(options.query, options.update, options.upsert);
    return id._id;
  }
  return collection.insert(options.query);
}

//crawl the categories
GetCategories = function(){
  HTTP.get(CategoriesUrl, 
    Options,
    function (error, result) {
      var $doc = $(result.content);
      var $menu = $doc.find('.clsMainMenu a:nth-child(3)');
      //gather all of the top level categories
      var rootCategories = $menu.map(function(index, element){
        element.href.match(/itcat=(\d+)/g);
        var val = RegExp.$1;
        return {
          name: element.title.split(':')[1].substring(1),
          subCatUrl: SubCategoryUrlTemp.replace(/{(0)}/g, val),
          listingsUrl: element.href,
          parent: null
        };
      });

      //look at each category, get every subcategory, and store them in
      //the db
      for(var j = 0; j < rootCategories.length; j++){
        var categoryName = rootCategories[j].name;
        //upsert category
        var q = { name: categoryName, parent: null };
        var catId = FindAndUpdate(Categories, {
          query: q,
          update: { $set: q },
          new: true,
          upsert: true
        });
        GetListings(catId, rootCategories[j].listingsUrl);
        
        HTTP.get(rootCategories[j].subCatUrl, Options, function(error, result){
          var $doc = $(result.content);
          //the categories that have 3 child nodes are the subrootCategories
          //of the current expanded category
          var $submenu = $doc.find('.clsMainMenu');
          for( var i = 0; i < $submenu.length; i++){
            var children = $submenu.eq(i).children();
            if(children.length != 3){
              continue;
            }
            var child = children.eq(2);
            var listingsUrl = child.attr('href');
            var categoryName =  child.attr('title').split(':')[1].substring(5);
            //store the category in the db
            var q = {
              name: categoryName,
              parent: this.parentCategoryId
            }
            var catId = FindAndUpdate(Categories, {
              query: q,
              update: { $set: q },
              new: true,
              upsert: true
            });
            //lookup the listings for this subcategory
            GetListings(catId, listingsUrl);
          }
        //bind the category to each subcateogry lookup
        }.bind({parentCategoryId: catId}));
      }
    });
};

//get the listings in the frame and populate the db
GetListings = function (CategoryId, listingUrl, lastCrawl) {
  listingUrl = listingUrl.replace('viewid=1', 'viewid=2');
  if( !listingUrl.match('viewid=2') ){
    listingUrl = listingUrl + '&viewid=2';
  }
  HTTP.get(listingUrl, Options, function (error, result) {
    var $document = $(result.content);
    if(!lastCrawl){
      $document.find('center').eq(1).find('a').each(function(){
        GetListings(CategoryId, this.href, true);
      });
    }
    var $rows = $document.find('.clsGRID tr:not(:first-child)');
    $rows.each(function (index, row) {
      var columns = $(row).find('td');

      var itemNumber = parseInt(columns.eq(1).find('a').text());
      var brand = columns.eq(2).text();
      var pack = columns.eq(3).text();
      var description = columns.eq(4).text();
      var stock = parseInt(columns.eq(5).text());
      Products.update({
          productNumber: itemNumber,
          brand: brand,
          pack: pack,
          description: description,
          category: CategoryId,
        }, 
        {
          $set: { stock: stock }
        },
        {
          upsert: true
        });
    });
  });
};
