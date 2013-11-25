Meteor.methods({
  startCrawl: function(){
    CrawlMcFarlings();
  },
  addCategories: function () {
    AddGPCCategories();
  },
  preheat: function () {
    BreadWriter.getProducts();
  }
});

/**
 * @param Options
 * {
 *  category: null (all categories) or categoryId or [categoryId, categoryId, ...]
 * }
 * TODO: company
 */
Meteor.publish('products', function pubProducts(options) {
  if(!options){
    //return all products TODO: Reevaluate
    return Products.find({}, {limit:50});
  }
  return Products.find( options , {limit:100});
});

/**
 * @param Options
 * {
 *    type: 'segment', 'family', 'class' or 'brick'
 *    parent: id of parent category,
 *    TODO: companyId: id of company
 * }
*/
Meteor.publish('categories', function pubCategories(options) {
  //TODO: filter categories based on company's product availibility
  var productsCurser = Products.find({}, {
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