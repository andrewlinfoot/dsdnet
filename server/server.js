Meteor.methods({
  startCrawl : function(){
    CrawlMcFarlings();
  }
});

// Publish Functions
Meteor.publish('currentCompany', function (currentCompanyUrl) {
	return Companies.find({url: currentCompanyUrl});
});

Meteor.publish('categories', function () {
	return Categories.find({parent: null});
});

Meteor.publish('subCategories', function (currentCategory) {
	return Categories.find({parent: currentCategory});
});

Meteor.publish('products', function (currentCategory) {
	if (currentCategory) {
		var subCategories = Categories.find({parent: currentCategory});
		var categoryIdArray = [currentCategory];
		subCategories.forEach( function (category) {
			categoryIdArray.push(category._id);
		});
		return Products.find({category: { $in: categoryIdArray } }, {limit:50, sort: {name: 1} });
	} else {
		return Products.find({}, {limit:25, sort: {name: 1} });
	}
});
