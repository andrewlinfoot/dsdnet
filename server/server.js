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
Meteor.publish('company', function (companySlug) {
	return Companies.find({slug: companySlug});
});

Meteor.publish('companyCategories', function (companySlug) {
	var company = Companies.findOne({slug: companySlug});
	return Categories.find({company: company._id, parent: null });
});

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
