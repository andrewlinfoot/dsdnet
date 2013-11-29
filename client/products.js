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

	var searchFilter = Session.get('searchFilter');
	if (searchFilter) {
		query = {
			"product_data.custom_product_name": { $regex: searchFilter, $options: 'i'}
		};
	}

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

	return Products.find(query, {sort: {"product_data.custom_product_name": 1}});
};

Template.breadCrumb.crumbs = function() {
	var categorySelect = Session.get('categorySelect');
	var categoryArray = [];
	for(var i = 0; i < categorySelect.length; i++) {
		categoryArray[i] = Categories.findOne({_id: categorySelect[i]});
	}
	return categoryArray;
};

Template.breadCrumb.rendered = function () {
	$crumbs = $('.crumbs');
	var crumbString = $crumbs.text().trim();
	crumbString = crumbString.replace(/\s{2,}/g, ' ');
	$('#search').attr('placeholder','Search in '+crumbString );
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
				break;
			case 'family':
				categoryIndex = 1;
				break;
			case 'class':
				categoryIndex = 2;
				break;
			case 'brick':
				categoryIndex = 3;
				break;
		}

		var categorySelect = Session.get('categorySelect');
		categorySelect[categoryIndex] = categoryId;
		for(var i = 1; i < (4-categoryIndex); i++) {
			categorySelect[categoryIndex+i] = null;
		}
		Session.set('categorySelect', categorySelect);

		//removes any search query
		Session.set('searchFilter', undefined);
		$('#search').val('');

		//re-runs the products subscribe
		Session.set('itemsLimit', 20);

		Meteor.subscribe('categories', {
			parent: categoryId,
			companySlug: Session.get('companySlug')
		});
	}
});

var buildProductSubOptions = function (limit, searchFilter) {
	var companySlug = Session.get('companySlug');
	var options = {
		companySlug: companySlug,
		limit: limit,
		query: {}
	};
	if(searchFilter) {
		options.query = {
			"product_data.custom_product_name": { $regex: searchFilter, $options: 'i'}
		};
	}
	var categorySelect = Session.get('categorySelect');
	for(var i = 0; i < categorySelect.length; i++) {
		if(categorySelect[i] !== null) {
			switch(i)
			{
				case 0:
					options.query.segmentId = categorySelect[i];
					break;
				case 1:
					options.query.familyId = categorySelect[i];
					break;
				case 2:
					options.query.classId = categorySelect[i];
					break;
				case 3:
					options.query.brickId = categorySelect[i];
			}
		}
	}
	return options;
};

var ITEMS_INCREMENT = 20;

Deps.autorun(function() {
	var itemsLimit = Session.get('itemsLimit');
	if(itemsLimit) {
		var searchFilter = Session.get('searchFilter');
		var options = buildProductSubOptions(itemsLimit, searchFilter);
		Meteor.subscribe('products', options, function() {
			//removes the loading icon when there are no more products
			var productCount = Products.find().count();
			var itemsLimit = Session.get('itemsLimit');
			if(itemsLimit > productCount){
				$('#showMoreResults').html('');
			}
		});
	}
});

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
    var threshold, target = $('#showMoreResults');
    if (!target.length) return;
 
    threshold = $(window).scrollTop() + $(window).height() - target.height();

    if (target.offset().top < threshold) {
        if (!target.data('visible')) {
            // console.log('target became visible (inside viewable area)');
            target.data('visible', true);
            Session.set('itemsLimit',
                Session.get('itemsLimit') + ITEMS_INCREMENT);
        }
    } else {
        if (target.data('visible')) {
            // console.log('target became invisible (below viewable arae)');
            target.data('visible', false);
        }
    }
}
 
// run the above func every time the user scrolls
// TODO: more efficient way, rap so that it
// only runs on the company page
$(window).scroll(showMoreVisible);

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

//Search
Template.navigationBar.events({
	'keyup #search' : function (e) {
		e.preventDefault();
		if (this.timeoutId) {
			Meteor.clearTimeout(this.timeoutId);
		}
    var text = e.currentTarget.value;
		this.timeoutId = Meteor.setTimeout(function () {
			if(text.length > 1) {
				Session.set('searchFilter', text);
			} else {
				Session.set('searchFilter', undefined);
			}
		}, 200);
	}
});

Template.prodMod.rendered = function () {
	var searchFilter = Session.get('searchFilter');
	if(searchFilter) {
		$(this.find('h3')).highlight(searchFilter);
	}
};