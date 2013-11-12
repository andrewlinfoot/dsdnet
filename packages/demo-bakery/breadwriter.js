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

var eachItem = function eachItem(callback) {
  for(var el in kwikee){
    if(kwikee.hasOwnProperty(el)) {
      kwikee[el].forEach(callback);
    }
  }
}

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
      var data = JSON.parse(response.content);
      if(data.status === 1){
        var product = data.content;
        var brickId = product.product_data.gpc_brick_id;
        var category = Categories.findOne({code: brickId});
        product.brickId = category._id;
        product.gtin = product.product_data.gtin;
        Products.update({
          product_data: {
            gtin: product.gtin
          }
        }, product, {upsert: true});
      }
    });
}
BreadWriter.getProducts = function getProducts() {
  kwikeeLogin(function(){
    eachItem(getProduct);
  });
}

