Handlebars.registerHelper('titleCase', function(str){
	return str.replace(/\w+\S*/g, function(match) {
		return match.substring(0,1)
			.toUpperCase()
			.concat(match.substring(1));
	});
});