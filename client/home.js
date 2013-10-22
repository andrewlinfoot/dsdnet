Template.home.companyProfile = function () {
	return Companies.find({url: Session.get("companyUrl")});
};