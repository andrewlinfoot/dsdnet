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
//TODO fix
Session.set('currentSegment', Categories.findOne({code: '50000000'})._id);
Session.set('currentFamily', 'all');
Session.set('currentClass', 'all');