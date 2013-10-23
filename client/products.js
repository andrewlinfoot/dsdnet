Template.products.categories = function () {
    return ["Dairy", "Produce"];
};

Template.products.companyName = function () {
    return Session.get("companyName");
};

Template.products.products = function () {
	return ["Cow Poop", "Chicken Little", "The Great Gadsby"];
}

Template.navbar.categories = function () {
	return ["Dairy", "Produce"];
};