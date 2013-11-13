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
  if(!options || !options.category){
    //return all products TODO: Reevaluate
    return Products.find({}, {limit: 50});
  }
  var categories = Array.isArray(options.category) ? options.category : [options.category];
  return Products.find( {
    brickId: {
      $in: category
    }
  });
});
