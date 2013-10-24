Meteor.subscribe('categories');

Deps.autorun( function () {
	Meteor.subscribe('subCategories', Session.get('currentCategory'));
});

Deps.autorun( function () {
	Meteor.subscribe('products', Session.get('currentCategory'));
});

Deps.autorun( function () {
	Meteor.subscribe('currentCompany', Session.get('currentCompanyUrl'));
});

Template.products.categories = function () {
    return Categories.find({parent: null}, {sort: {name: 1} });
};

Template.products.subCategories = function () {
	if( Session.equals('currentCategory', this._id) ) {
		return Categories.find({parent: Session.get('currentCategory') }, {sort: {name: 1} });
	}
};

Template.products.currentCategory = function () {
	return Session.equals('currentCategory', this._id) ? 'active' : '';
};

Template.products.currentSubCategory = function () {
	return Session.equals('currentSubCategory', this._id) ? 'active' : '';
};

Template.products.companyName = function () {
    return Companies.find({url: Session.get('companyUrl')});
};

Template.products.products = function () {
	var currentSubCategory = Session.get('currentSubCategory');

	if(currentSubCategory) {
		return Products.find({category: currentSubCategory}, {limit: 50, sort: {description: 1} });
	} else {
		return Products.find({}, {limit: 50, sort: {description: 1} });
	}
};

Template.navbar.categories = function () {
	return Categories.find({parent: null}, {sort: {name: 1} });
};

Template.products.events({
	'click a.category-item' : function (e) {
		e.preventDefault();
		Session.set('currentSubCategory', undefined);
		Session.set('currentCategory', this._id);
	},
	'click a.sub-category-item' : function (e) {
		e.preventDefault();
		Session.set('currentSubCategory', this._id);
	},
	'click a.plusmore' : function (e) {
		e.preventDefault();
		console.log('kaljfdsh');
	}
});