Template.products.events({
	'click .more-btn' : function (e) {
		e.preventDefault();
		var $target = $(e.currentTarget);
		var $module = $target.parent('.module');
		var $picture = $target.siblings('.product-picture');
		var $productContainer = $target.siblings('.product-facts-container');
		var $buttonText = $target.find('.more-btn-text');
		var $buttonSymbol = $target.find('.circle-inner');

		$picture.toggleClass('product-picture-expanded');
		$module.toggleClass('module-expanded');
		$productContainer.toggleClass('product-container-expanded');

		if($buttonText.text() === 'more') {
			$buttonText.text('less');
			$buttonSymbol.text('-');
		} else {
			$buttonText.text('more');
			$buttonSymbol.text('+');
		}
	}
});

Template.main.module = function () {
	return Products.find();
};

Template.nutritionInfo.sections = function () {
	return this.product_data.kwikee_nutrition[0];
};