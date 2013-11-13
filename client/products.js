Template.products.events({
	'click .more-btn' : function (e) {
		e.preventDefault();
		var $target = $(e.currentTarget);
		var $module = $target.parent('.module');
		var $picture = $target.siblings('.product-picture');
		var $productContainer = $target.siblings('.product-facts-container');
		var $buttonText = $target.find('.more-btn-text');
		var $buttonSymbol = $target.find('.circle-inner');

		$picture.toggleClass('product-picture-expanded');
		$module.toggleClass('module-expanded');
		$productContainer.toggleClass('product-container-expanded');

		if($buttonText.text() === 'more') {
			$buttonText.text('less');
			$buttonSymbol.text('-');
		} else {
			$buttonText.text('more');
			$buttonSymbol.text('+');
		}
	}
});

Template.main.module = function () {
	return [1,2,3,4,5];
};

// Old Code
// Template.products.categories = function () {
//     return Categories.find({parent: null}, {sort: {name: 1} });
// };

// Template.products.subCategories = function () {
// 	return Categories.find({parent: this._id}, {sort: {name: 1} });
// };

// Template.products.currentCategory = function () {
// 	return Session.equals('currentCategory', this._id) ? 'active' : '';
// };

// Template.products.currentSubCategory = function () {
// 	return Session.equals('currentSubCategory', this._id) ? 'active active-subcategory' : '';
// };

// Template.productsArea.products = function () {
// 	var searchQuery = Session.get('searchQuery');

// 	if(searchQuery) {
// 		return Products.find({description: { $regex: Session.get('searchQuery'), $options: 'i'} }, { sort: {description: 1} });
// 	} else {
// 		return Products.find({}, {sort: {description: 1} });
// 	}
// };

// Template.products.events({
// 	'click a.category-item' : function (e) {
// 		e.preventDefault();
// 		var company = Companies.findOne({_id: this.company});
// 		Session.set('currentSubCategory', undefined);
// 		Session.set('currentCategory', this._id);
// 		Router.go('companyProducts', {categorySlug:this.slug, companySlug: company.slug});
// 	},
// 	'click a.sub-category-item' : function (e) {
// 		e.preventDefault();
// 		var company = Companies.findOne({_id: this.company});
// 		Session.set('currentSubCategory', this._id);
// 		Router.go('companyProducts', {categorySlug:this.slug, companySlug: company.slug});
// 	},
// 	'click a.plusmore' : function (e) {
// 		e.preventDefault();
// 		var $target = $(e.currentTarget);
// 		$target.prev('.caption-wrapper').toggleClass('caption-wrapper-expanded');
// 		$target.text() === '- Less' ? $target.text('+ More') : $target.text('- Less');
// 	},
// 	'keyup .search-input' : function (e) {
// 		var searchQuery = e.currentTarget.value;
// 		if(searchQuery.length === 0) {
// 			Session.set('searchQuery', undefined);
// 		} else {
// 			Session.set('searchQuery', searchQuery);
// 		}
// 	}
// });