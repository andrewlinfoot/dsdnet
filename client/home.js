Template.home.companyProfile = function () {
	return Companies.find({url: Session.get("companyUrl")});
};

Template.home.categories = function () {
	return Categories.find({parent: null}, {sort: {name: 1} });
};
