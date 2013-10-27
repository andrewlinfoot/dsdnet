Template.company.companyProfile = function () {
	return Companies.find({url: Session.get("currentCompanyUrl")});
};

Template.company.categories = function () {
	return Categories.find({parent: null}, {sort: {name: 1} });
};

Template.company.events({
	'click .dsdnet-category-thumbnail' : function (e) {
		e.preventDefault();
		Session.set('currentCategory', this._id);
		Router.go( 'products', {url: Session.get('currentCompanyUrl')} );
	}
});