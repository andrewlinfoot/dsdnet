Template.products.categories = function () {
    return ["Dairy", "Produce"];
};

Template.products.companyName = function () {
    return Companies.find({url: Session.get("companyUrl")});
};