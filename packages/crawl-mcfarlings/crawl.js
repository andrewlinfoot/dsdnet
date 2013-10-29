Crawl = {};
Options = { headers: {} };

// ms interval between printing progress
// 0 disables logging
Crawl.logInterval = 10000;

Crawl.progress = {
  categories: {
    started: 0,
    finished: 0
  },
  products: {
    started: 0,
    finished: 0
  }
}
Crawl.trackIntervalId = null;
Crawl.trackProgress = function(){

  var progress = Crawl.progress;
  console.log('Category pages started: ', Crawl.progress.categories.started);
  console.log('Category pages finished: ', Crawl.progress.categories.finished);
  console.log('Product pages started: ', Crawl.progress.products.started);
  console.log('Product pages finished: ', Crawl.progress.products.finished);
  if( progress.categories.started == progress.categories.finished 
    && progress.products.started == progress.products.finished){
    console.log('Finished');
    Meteor.clearInterval(Crawl.trackIntervalId);
    return;
  }
  console.log('------------------------------');
}

CookieUrl = 
  'http://12.192.21.195/netlinkcatalog/asp/cucbook.asp?bunit=1&cuswhs=001';
CategoriesUrl = 
  'http://12.192.21.195/netlinkcatalog/asp/contentspane.asp?mode=NC';
SubCategoryUrlTemp = 
  'http://12.192.21.195/netlinkcatalog/asp/contentspane.asp?itcat={0}&open=1#{0}';
//start crawling McFarlings 
CrawlMcFarlings = function () {
  console.log('Refreshing Company Data');
  Crawl.companyId = Util.findUpdate(Companies, {
    query: {
      name: Company.name
    },
    update: {
      $set: Company
    }
  });
  console.log('Starting Crawl: McFarling Foods');
  Crawl.progress.categories.started++;
  if(Crawl.logInterval){
    Crawl.trackIntervalId = Meteor.setInterval(Crawl.trackProgress, Crawl.logInterval);
  }
  //grab the cookie
  HTTP.get(CookieUrl, function(error, result){
    Options.headers.Cookie = result.headers['set-cookie'][0];
    //start crawling rootCategories
    GetCategories();
  });
}

Util = {
  findUpdate : function(collection, options){
    var id = collection.findOne(options.query, { _id: true });
    id = id ? id._id : false;
    if(!id){
      id = collection.insert(options.query);
    }
    collection.update(options.query, options.update,{ upsert: options.upsert });
    return id;
  },
  toTitleCase : function(str){
    return str.replace(/\w+\S*/g, function(word) {
      return word.charAt(0).toUpperCase()
        .concat(word.substring(1).toLowerCase());
    });
  }
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
        //Update progress
        Crawl.progress.categories.started++;
        var categoryName = rootCategories[j].name;
        //upsert category
        var q = { 
          name: Util.toTitleCase(categoryName), 
          parent: null };
        var catId = Util.findUpdate(Categories, {
          query: q,
          update: { 
            $set: {
              name: q.name,
              parent: q.parent,
              company: Crawl.companyId,
              slug: q.name.replace(/\s/g,'_')
            }
          },
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
              name: Util.toTitleCase(categoryName),
              parent: this.parentCategoryId
            }
            var catId = Util.findUpdate(Categories, {
              query: q,
              update: { $set: {
                name: q.name,
                parent: q.parent,
                company: Crawl.companyId,
                slug: q.name.replace(/\s/g, '_').concat('_sub')
              }},
              new: true,
              upsert: true
            });
            //lookup the listings for this subcategory
            GetListings(catId, listingsUrl);
          }
          //Update progress
          Crawl.progress.categories.finished++;
        //bind the category to each subcateogry lookup
        }.bind({parentCategoryId: catId}));
      }
      Crawl.progress.categories.finished++;
    });
};

//get the listings in the frame and populate the db
GetListings = function (CategoryId, listingUrl, lastCrawl) {
  //update progress
  Crawl.progress.products.started++;
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
      var description = Util.toTitleCase(columns.eq(4).text());
      var stock = parseInt(columns.eq(5).text());
      Products.update({
          productNumber: itemNumber,
        }, 
        {
          $set: {
            stock: stock,
            brand: brand,
            pack: pack,
            description: description,
            category: CategoryId,
            slug: description.replace(/\s/g, '_')
          }
        },
        {
          upsert: true
        });
    });
    Crawl.progress.products.finished++;
  });
};
