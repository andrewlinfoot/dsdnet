Template.home.companyProfile = function () {
	return Companies.find({url: Session.get("companyUrl")});
};

Template.home.categories = function () {
	return ["Dairy", "Poultry", "Meats", "Category 5", "Category 5", "Category 5", "Category 5", "Category 5", "Category 5", "Category 5", "Category 5"];
}
