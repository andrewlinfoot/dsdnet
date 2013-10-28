Meteor.methods({
  startCrawl : function(){
    CrawlMcFarlings();
  }
});

// Publish Functions
Meteor.publish('currentCompany', function (companySlug) {
	return Companies.find({slug: companySlug});
});

// Meteor.publish('categories', function () {
// 	return Categories.find({parent: null});
// });

Meteor.publish('categoryProducts', function (companySlug, categorySlug) {
	var category = Categories.findOne({slug: categorySlug});
	if(category.parent === null) {
		var subCategories = Categories.find({parent: category._id});
		var categoryIdArray = [category._id];
		subCategories.forEach( function (category) {
			categoryIdArray.push(category._id);
		});
		return Products.find({category: { $in: categoryIdArray } });
	} else {
		return Products.find({category: category._id});
	}
});

Meteor.publish('categoryList', function (companySlug, categorySlug) {
	var company = Companies.findOne({slug: companySlug }, {fields: {_id: 1} });
	var category = Categories.findOne({slug: categorySlug }, {fields: {_id: 1, parent: 1} });
	return Categories.find({company: company._id,
		$or: [
			{parent: null},
			{parent: category.parent},
			{parent: category._id} ]
		});
});

// Meteor.publish('subCategories', function (currentCategory) {
// 	return Categories.find({parent: currentCategory});
// });

// Meteor.publish('products', function (currentCategory) {
// 	if (currentCategory) {
// 		var subCategories = Categories.find({parent: currentCategory});
// 		var categoryIdArray = [currentCategory];
// 		subCategories.forEach( function (category) {
// 			categoryIdArray.push(category._id);
// 		});
// 		return Products.find({category: { $in: categoryIdArray } }, {limit:50, sort: {name: 1} });
// 	} else {
// 		return Products.find({}, {limit:25, sort: {name: 1} });
// 	}
// });
