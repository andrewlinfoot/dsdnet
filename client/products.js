Template.products.categories = function () {
    return ["Dairy", "Produce"];
};

Template.products.companyName = function () {
    return Session.get("companyName");
};