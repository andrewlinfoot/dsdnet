fs = Npm.require('fs');
path = Npm.require('path');

AddGPCCategories = function () {
	var csvpath = path.join(path.resolve('.'), 'assets/packages/gpc-categories/gpc-data.csv');
	csv()
	.from(fs.createReadStream(csvpath))
	.to.array( boundFunction )
	.on('end', function(){ console.log('done'); });
};

var boundFunction = Meteor.bindEnvironment(function (data, count) {
		data.forEach(function(element, index, array) {
			for(i=0;i<4;i++) {
				var obj = {
					code: element[i*2],
					description: element[(i*2)+1],
				};
				if(i===0) {
					obj.parent = null;
					obj.type = 'segment';
				} else {
					var objParent = Categories.findOne({code: element[(i-1)*2]});
					obj.parent = objParent._id;
					if(i===1){
						obj.type = 'family';
					}
					if(i===2){
						obj.type = 'class';
					}
					if(i===3){
						obj.type = 'brick';
					}
				}
				Categories.update({code: obj.code}, obj, {upsert: true});
			}	
		})
	}, function (e) {
		throw e;
	});