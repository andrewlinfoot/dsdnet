Crawl = {};
Options = { headers: {} };

CompanyRoot = {
  name: 'McFarling Foods',
  description: 'From our humble beginnings in 1948, McFarling Foods grew to become one of the largest independently-owned foodservice distributors in Indiana and a shareholder in Unipro Foodservice Inc., the world\'s largest foodservice cooperative. In 2009, we\'re celebrating our next step - becoming Indiana\'s largest 100% employee-owned food distributor. We are proud to say that when you call McFarling Foods, you\'re always speaking to an owner. Although our ownership structure has changed, our customers know they can expect the same commitment to service and quality brands that have helped the company become what it is today. McFarling Foods sells CODE, COMPANIONS, CORTONA, and WORLD HORIZON label products, in addition to hundreds of familiar national-labeled lines. McFarling Foods manufactures many products in our modern USDA-inspected meat and poultry departments. We have fresh seafood arriving daily and stock broadline inventories of fresh produce, fluid milk, and ice cream. Extensive frozen, canned, dry, disposable and chemical lines complete our product line. Our customers include renowned independent fine dining, deli, catering and concession, hospital and healthcare, industrial and institutional foodservice operators. McFarling Foods has provided national brands and programs through the local connection to our community for over a half-century. Arrange to visit our facility in Indianapolis. We\'ll show you our investment in the future.',
  address: '333 West 14th Street Indianapolis, IN 46202',
  phone: '(800) 622-9003',
  website: 'http://www.mcfarling.com/',
  slug: 'McFarling_Foods'
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
  Crawl.companyId = FindAndUpdate(Companies, {
    query: {
      name: CompanyRoot.name
    },
    update: {
      $set: CompanyRoot
    }
  });
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
              name: categoryName,
              parent: this.parentCategoryId
            }
            var catId = FindAndUpdate(Categories, {
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
  });
};
