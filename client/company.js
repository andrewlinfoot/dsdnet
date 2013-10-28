Template.company.companyProfile = function () {
	return Companies.find({slug: Session.get("currentCompanySlug")});
};

Template.company.categories = function () {
	return Categories.find({parent: null}, {sort: {name: 1} });
};

Template.company.events({
	'click .dsdnet-category-thumbnail' : function (e) {
		e.preventDefault();
		var company = Companies.findOne({_id: this.company});
		Session.set('currentCategory', this._id);
		Router.go('companyProducts', {categorySlug:this.slug, companySlug: company.slug});
	}
});