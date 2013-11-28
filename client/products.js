Template.products.events({
	'click .more-btn' : function (e) {
		e.preventDefault();
		var $target = $(e.currentTarget);
		var $module = $target.parent('.module');
		var $picture = $target.siblings('.product-picture');
		var $productContainer = $target.siblings('.product-facts-container');
		
		var $buttonIcon = $target.find('.more-button-icon');
		$buttonIcon.toggleClass('plus-btn');
		$buttonIcon.toggleClass('minus-btn');
		
		var $buttonText = $target.find('.more-button-text');
		$buttonText.text($buttonIcon.hasClass('plus-btn') ? 'MORE':'LESS');

		var $nutritionContainer = $target.siblings('.nutrition-ing');

		$nutritionContainer.toggle(500);

		$picture.toggleClass('product-picture-expanded');
		
		$module.toggleClass('module-expanded');
		$productContainer.toggleClass('product-container-expanded');

	}
});

Template.nutritionInfo.helpers({
	firstColumn: function(){
		return this.slice(0,3);
	},
	secondColumn: function(){
		return this[3];
	}
});

Template.main.module = function () {
	var segment = Session.get('categorySelect')[0];
	var family = Session.get('categorySelect')[1];
	var mclass = Session.get('categorySelect')[2];
	var brick = Session.get('categorySelect')[3];
	var query = {};
	if(segment){
		query.segmentId = segment;
	}
	if(family){
		query.familyId = family;
	}
	if(mclass){
		query.classId = mclass;
	}
	if(brick){
		query.brickId = brick;
	}
	return Products.find(query);
};

Template.breadCrumb.crumbs = function() {
	var categorySelect = Session.get('categorySelect');
	var categoryArray = [];
	for(var i = 0; i < categorySelect.length; i++) {
		categoryArray[i] = Categories.findOne({_id: categorySelect[i]});
	}
	return categoryArray;
};

Template.categories.helpers({
	'categoryDropdown' : function () {
		var categorySelect = Session.get('categorySelect');
		var dropdownArray = [
			{
				type: 'family',
				categoryList: Categories.find({type: 'family'})
			},
			{
				type: 'class',
				categoryList: Categories.find({type: 'class', parent: categorySelect[1]})
			},
			{
				type: 'brick',
				categoryList: Categories.find({type: 'brick', parent: categorySelect[2]})
			}
		];
		return dropdownArray;
	}
});

Template.categories.events( {
	'click .category-item': function (e) {
		e.preventDefault();
		var companySlug = Session.get('companySlug');
		var options = {
			companySlug: companySlug,
			query: {}
		};

		var type = this.type;
		var categoryId = this._id;

		//if category id is undefined,
		//the category is all
		if(!categoryId){
			categoryId = null;
		}

		var categoryIndex;
		switch(type)
		{
			case 'segment':
				categoryIndex = 0;
				options.query.segmentId = categoryId;
				break;
			case 'family':
				categoryIndex = 1;
				options.query.familyId = categoryId;
				break;
			case 'class':
				categoryIndex = 2;
				options.query.classId = categoryId;
				break;
			case 'brick':
				categoryIndex = 3;
				options.query.brickId = categoryId;
				break;
		}

		var categorySelect = Session.get('categorySelect');
		categorySelect[categoryIndex] = categoryId;
		for(var i = 1; i < (4-categoryIndex); i++) {
			categorySelect[categoryIndex+i] = null;
		}
		Session.set('categorySelect', categorySelect);

		Meteor.subscribe('categories', {parent: categoryId, companySlug: companySlug});
		Meteor.subscribe('products', options);
	}
});

Session.set('categorySelect', [null, null, null, null]);

Template.categories.rendered = function () {
	var $classDropdown = $('.class-dropdown');
	var $brickDropdown = $('.brick-dropdown');

	if(Session.get('categorySelect')[1] === null) {
		$classDropdown.hide();
	} else {
		$classDropdown.show();
	}
	if(Session.get('categorySelect')[2] === null) {
		$brickDropdown.hide();
	} else {
		$brickDropdown.show();
	}
};