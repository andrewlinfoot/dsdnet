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


//TODO: implement category filtering based in item availability
/**
 * @param Options
 * {
 *    type: 'segment', 'family', 'class' or 'brick'
 *    parent: id of parent category
 * }
*/
Meteor.publish('categories', function pubCategories(options) {
  if(!options) {
    // all categories
    return Categories.find().limit(50);
  }
  if(!options.parent){
    // hard code food/beverage/tobacco segment
    // TODO: remove
    var foodCat = Categories.findOne({code: '50000000'});
    return Categories.find({type: options.type, parent: foodCat._id});
  }
  return Categories.find({parent: options.parent});
});