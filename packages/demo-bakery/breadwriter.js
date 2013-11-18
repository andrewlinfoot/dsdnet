BreadWriter = {};
var Options = {
  headers: {}
};
var kwikeeLogin = function kwikeeLogin(callback) {
  var loginURL = 'http://new.kwikeesystems.com/members/handler';
  HTTP.post(loginURL, {
    params: {
        func: 'display_welcome',
        submit: 1,
        username: 'cmac2992',
        password: 'TempPass9'
      }
    },
    function(error, result) {
      Options.headers.Cookie = result.headers['set-cookie'][0];
      callback();
  });
};

var readBrick = function readBrick(brickCode) {
  console.log('loading brick: ', brickCode)
  var categoryUrl = 'http://new.kwikeesystems.com/members/handler?func=search&search_type=gpc_categories&gpc_brick_id={0}'.replace('{0}', brickCode);
  HTTP.get(categoryUrl, {
    params: {
      func: 'search',
      search_type: 'gpc_categories',
      gpc_brick_id: brickCode
    },
    headers: Options.headers
  },
  function(error, response){
    var jsdom = cheerio.load(response.content);
    var scriptText = jsdom('head script').eq(2).text();
    eval(scriptText);

    search_json.map(function(product){
      //console.log('lookup product: ', product.product_base_id);
      getProduct(product.product_base_id);
    });

  });
};

var getProduct = function getProduct(element) {
  var url = 'http://new.kwikeesystems.com/members/handler';
  HTTP.get(url, {
      params: {
        func: 'load_product',
        product_base_id: element
      },
      headers: Options.headers
    },
    function(error, response){
      //console.log('retrieved product: ', this);
      var data = JSON.parse(response.content);
      if(data.status === 1){
        var product = data.content;
        var brickId = product.product_data.gpc_brick_id;
        var brick = Categories.findOne({code: brickId});
        var mclass = Categories.findOne({_id: brick.parent});
        var family = Categories.findOne({_id: mclass.parent});
        var segment = Categories.findOne({_id: family.parent});
        product.classId = mclass._id;
        product.familyId = family._id;
        product.segmentId = family._id;
        product.brickId = brick._id;
        product.gtin = product.product_data.gtin;
        Products.update({
          gtin: product.gtin
        }, product, {upsert: true});
      }
    }.bind(element));
};
BreadWriter.getProducts = function getProducts() {
  kwikeeLogin(function(){
    //only crawl the ceareal brick to cut down on crawling
    var brickCode = 10000601;
    readBrick(BrickCode);
    return
    //to crawl all the food service categories
    var foodSegmentId = Categories.findOne({code: '50000000'})._id;
    var foodSegFamiliesIds = Categories.find({parent: foodSegmentId})
      .fetch()
      .map(function(category) {
        return category._id;
      });
    var foodSegFamClass = Categories.find({parent: {$in: foodSegFamiliesIds}})
      .fetch()
      .map(function(category) {
        return category._id;
      });
    var brickCodes = Categories.find({parent: {$in: foodSegFamClass}})
      .fetch()
      .map(function(category){
        return category.code;
      });
    brickCodes.forEach(readBrick);
  });
};

