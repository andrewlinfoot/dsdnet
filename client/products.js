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

Template.categories.helpers({
	'family' : function () {
		return Categories.find({type: 'family'});
	},
	'class' : function () {
		return Categories.find({type: 'class', parent: Session.get('currentFamily')});
	},
	'brick' : function () {
		return Categories.find({type: 'brick', parent: Session.get('currentClass')});
	}
});

Template.categories.events( {
	'click .category-item': function (e) {
		e.preventDefault();
		Meteor.subscribe('categories', {parent: this._id});
		if(this.type === 'family') {
				Session.set('currentFamily', this._id);
		}
		if(this.type === 'class') {
				Session.set('currentClass', this._id);
		}
		if(this.type === 'brick') {
				Session.set('currentBrick', this._id);
		}
	}
});

Session.set('currentFamily', 'all');
Session.set('currentClass', 'all');