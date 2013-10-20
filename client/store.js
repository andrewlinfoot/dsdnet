Template.store.categories = function () {
    return ["Dairy", "Produce"];
};

Template.store.companyName = function () {
    return Session.get("companyName");
};