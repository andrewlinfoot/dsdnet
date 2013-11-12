BreadWriter = {};
var Options = {
  headers: {}
};
var kwikeeLogin = function kwikeeLogin(callback) {
  var loginURL = 'http://new.kwikeesystems.com/members/handler'
  HTTP.get(loginURL, {
      func: 'display_welcome',
      username: 'cmac2992',
      password: 'temppass9'
    },
    function(error, result) {
      Options.headers.Cookie = result.headers['set-cookie'][0];
      console.log(Options.headers.Cookie);
      callback();
  }
};

var eachItem = function eachItem(callback) {
  for(var el in kwikee){
    if(kwikee.hasOwnProperty(el)) {
      kwikee[el].each(callback);
    }
  }
}

var getProduct = function getProduct() {
  var url = 'http://new.kwikeesystems.com/members/handler';
  HTTP.get(url, {
      func: 'load_product',
      product_base_id: this
    },
    function(data){
      Products.insert(data);
    });
}
BreadWriter.getProducts = function getProducts() {
  kwikeeLogin(function(){
    eachItem(getProduct)
  });
}

