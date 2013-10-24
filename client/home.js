Template.home.companyProfile = function () {
	return Companies.find({url: Session.get("currentCompanyUrl")});
};

Template.home.categories = function () {
	return Categories.find({parent: null}, {sort: {name: 1} });
};
