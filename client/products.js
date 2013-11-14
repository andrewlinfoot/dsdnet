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
	var segment = Session.get('currentSegment');
	var family = Session.get('currentFamily');
	var mclass = Session.get('currentClass');
	var brick = Session.get('currentBrick');
	var query = {};
	if(segment && segment !== 'all'){
		query.segmentId = segment;
	}
	if(family && family !== 'all'){
		query.familyId = family;
	}
	if(mclass && mclass !== 'all'){
		query.classId = mclass;
	}
	if(brick && brick !== 'all'){
		query.brickId = brick;
	}
	return Products.find(query);
};

// TODO: fix the crumbString............. I'm sorry
Template.breadCrumb.crumbs = function() {
	var crumbsString = '';
	if(Session.equals('currentFamily','all')) {
		crumbsString = crumbsString + 'All';
	} else {
		var family = Categories.findOne({_id: Session.get('currentFamily')});
		crumbsString = crumbsString + family.description;
	}
	if(Session.equals('currentClass', 'all') && !Session.equals('currentFamily','all')) {
		crumbsString = crumbsString + ' > All';
	} else if (!Session.equals('currentFamily','all')) {
		var mclass = Categories.findOne({_id: Session.get('currentClass')});
		crumbsString = crumbsString + ' > ' + mclass.description;
	}
	if(Session.equals('currentBrick', 'all') && !Session.equals('currentClass','all')) {
		crumbsString = crumbsString + ' > All';
	} else if (!Session.equals('currentBrick', 'all')) {
		console.log(Session.get('currentBrick'));
		var brick = Categories.findOne({_id: Session.get('currentBrick')});
		crumbsString = crumbsString + ' > ' + brick.description;
	}
	return crumbsString;
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

//TODO - FIX THIS CODE!!!!
Template.categories.events( {
	'click .category-item': function (e) {
		e.preventDefault();
		var $target = $(e.currentTarget);
		if($target.hasClass('family-all')){
			Session.set('currentFamily', 'all');
			Session.set('currentClass', 'all');
			Session.set('currentBrick', 'all');
		}
		if($target.hasClass('class-all')){
			Session.set('currentClass', 'all');
			Session.set('currentBrick', 'all');
		}
		if($target.hasClass('brick-all')){
			Session.set('currentBrick', 'all');
		}
		Meteor.subscribe('categories', {parent: this._id});
		if(this.type === 'family') {
			Meteor.subscribe('products', {familyId: this._id});
			Session.set('currentFamily', this._id);
			Session.set('currentClass', 'all');
			Session.set('currentBrick', 'all');
		}
		if(this.type === 'class') {
			Meteor.subscribe('products', {classId: this._id});
			Session.set('currentClass', this._id);
			Session.set('currentBrick', 'all');
		}
		if(this.type === 'brick') {
			Meteor.subscribe('products', {brickId: this._id});
			Session.set('currentBrick', this._id);
		}
	}
});

Template.categories.rendered = function () {
	var $classDropdown = $('.class-dropdown');
	var $brickDropdown = $('.brick-dropdown');
	if(Session.equals('currentFamily', 'all')) {
		$classDropdown.hide();
	} else {
		$classDropdown.show();
	}
	if(Session.equals('currentClass', 'all')) {
		$brickDropdown.hide();
	} else {
		$brickDropdown.show();
	}
};

Session.set('categorySelect', [null, null, null, null]);

//TODO fix
//Session.set('currentSegment', Categories.findOne({code: '50000000'})._id);
Session.set('currentFamily', 'all');
Session.set('currentClass', 'all');
Session.set('currentBrick', 'all');