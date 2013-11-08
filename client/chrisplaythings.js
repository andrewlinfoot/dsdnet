Template.chrisplaythings.events({
	'click .more-btn' : function (e) {
		e.preventDefault();
		var $target = $(e.currentTarget);
		var $module = $target.parent('.module');
		var $picture = $target.siblings('.product-picture');
		var $productContainer = $target.siblings('.product-facts-container');
		$picture.toggleClass('product-picture-expanded');
		$module.toggleClass('module-expanded');
		$productContainer.toggleClass('product-container-expanded');
	}
});