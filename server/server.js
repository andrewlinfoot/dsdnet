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

// Publish Functions
// Meteor.publish('company', function (companySlug) {
// 	return Companies.find({slug: companySlug});
// });

// Meteor.publish('companyCategories', function (companySlug) {
// 	var company = Companies.findOne({slug: companySlug});
// 	return Categories.find({company: company._id, parent: null });
// });

// Meteor.publish('categoryProducts', function (companySlug, categorySlug) {
// 	var category = Categories.findOne({slug: categorySlug});
// 	if(category.parent === null) {
// 		var subCategories = Categories.find({parent: category._id});
// 		var categoryIdArray = [category._id];
// 		subCategories.forEach( function (category) {
// 			categoryIdArray.push(category._id);
// 		});
// 		return Products.find({category: { $in: categoryIdArray } });
// 	} else {
// 		return Products.find({category: category._id});
// 	}
// });

// Meteor.publish('categoryList', function (companySlug, categorySlug) {
// 	var company = Companies.findOne({slug: companySlug }, {fields: {_id: 1} });
// 	var category = Categories.findOne({slug: categorySlug }, {fields: {_id: 1, parent: 1} });
// 	return Categories.find( {
//     company: company._id,
// 		parent: {
//       $in: [
// 			  null,
// 			  category.parent,
// 			  category._id ]
// 		  }
//     });
// });

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
