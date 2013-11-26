Meteor.methods({
  startCrawl: function(){
    CrawlMcFarlings();
  },
  addCategories: function () {
    AddGPCCategories();
  },
  preheat: function () {
    BreadWriter.getProducts();
  },
  addProductCompany: function () {
    addProductCompany();
  }
});

var addProductCompany = function () {
  var productSet = Products.find({}, {
    limit: 8000,
    fields: {
      _id: 1
    }
  });

  var company = {
    name: 'McFarling Foods',
    slug: 'mcfarling',
    phone: '(425) 829-1216'
  };

  var companyId = '';
  if( Companies.findOne({slug: 'mcfarling'}) ) {
    companyId = Companies.findOne({slug: 'mcfarling'});
    companyId = companyId._id;
  } else {
    companyId = Companies.insert(company);
  }

  productSet.forEach( function (product) {
    var productCompanyObj = {
      productId: product._id,
      companyId: companyId
    };
    ProductCompany.update({
      productId: product._id
    }, productCompanyObj, {
      upsert: true});
  });

};


var getCompanyProducts = function (companySlug) {
  var company = Companies.findOne({slug: companySlug});
  var productCompanyCurser = ProductCompany.find({
    companyId: company._id
  },{
    fields: {
      productId: 1
    }
  });
  var productsArray = productCompanyCurser.map( function (product) {
    return product.productId;
  });
  return productsArray;
};

/**
 * @param Options
 * {
 *  companySlug: the company slug
 *  query: {
 *    brickId or familyId or classId: mongo id
 *  }
 * }
 * TODO: company
 */
Meteor.publish('products', function pubProducts(options) {
  if(!options){
    //return all products TODO: Reevaluate
    return Products.find({}, {limit:50});
  }
  var companySlug = options.companySlug;
  var productsArray = getCompanyProducts(companySlug);

  //TODO: find better solution
  var query = {};
  if(options.query) {
    query = options.query;
  }
  query._id = {$in: productsArray};

  return Products.find(query, {limit:25});
});

/**
 * @param Options
 * {
 *    type: 'segment', 'family', 'class' or 'brick'
 *    parent: id of parent category,
 *    companySlug: company slug
 * }
*/
Meteor.publish('categories', function pubCategories(options) {
  var companySlug = options.companySlug;
  var productsArray = getCompanyProducts(companySlug);

  var productsCurser = Products.find({
    _id: {
      $in: productsArray
    }
  }, {
    fields: {
      classId: 1,
      familyId: 1,
      segmentId: 1,
      brickId: 1
    }
  });

  // Might be a better solution. Currently iterating
  // through every product without too much of
  // a noticable performance loss. 41478 products
  var categoriesWithProducts = [];
  productsCurser.forEach( function (product) {
    categoriesWithProducts.push(product.classId);
    categoriesWithProducts.push(product.familyId);
    categoriesWithProducts.push(product.segmentId);
    categoriesWithProducts.push(product.brickId);
  });

  categoriesWithProducts = _.uniq(categoriesWithProducts);

  if(!options) {
    // all categories
    return Categories.find().limit(50);
  }
  if(!options.parent){
    // hard code food/beverage/tobacco segment
    // TODO: remove
    var foodCat = Categories.findOne({code: '50000000'});
    return Categories.find({
      type: options.type,
      parent: foodCat._id,
      _id: {$in: categoriesWithProducts}
    });
  }
  return Categories.find({
    parent: options.parent,
    _id: {$in: categoriesWithProducts}
  });
});

/**
 * TODO: make options work
 * @param Options
 * {
 *  gtin: product gtin
 *  companyId: company id to verify they are paying
 * }
*/
Meteor.publish('productListing', function pubProductListing(options) {
  var gtin = options.gtin;
  return Products.find({
    gtin: gtin
  }, {
    limit:1
  });
});