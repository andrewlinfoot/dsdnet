Meteor.subscribe('categories');

Deps.autorun( function () {
	Meteor.subscribe('products', Session.get('currentCategory'));
});

Deps.autorun( function () {
	Meteor.subscribe('currentCompany', Session.get('currentCompanyUrl'));
});

Template.products.categories = function () {
    return Categories.find({parent: null}, {sort: {name: 1} });
};

Template.products.currentCategory = function () {
	return Session.equals('currentCategory', this._id) ? 'active' : '';
};

Template.products.companyName = function () {
    return Companies.find({url: Session.get("companyUrl")});
};

Template.products.products = function () {
	var currentCategory = Session.get(currentCategory);
	if (currentCategory) {
		//return products filtered by category
		return Products.find({}, {limit: 50, sort: {description: 1} });
	} else {
		//return all products
		return Products.find({}, {limit:50, sort: {description: 1} });
	}
};

Template.navbar.categories = function () {
	return Categories.find({parent: null}, {sort: {name: 1} });
};

Template.products.events({
	'click a.category-item' : function (e) {
		e.preventDefault();
		Session.set("currentCategory",this._id);
	}
});