Products = new Meteor.Collection('products');

// {
// 	_id: product id,
// 	name: product name,
// 	other info goes here...
// }

Categories = new Meteor.Collection('categories');

// {
// 	_id: categories id,
// 	name: category name,
// 	parent: parent categories id || null
// }

Companies = new Meteor.Collection('companies');

// {
// 	_id: companies id,
//	url: company page url
// 	name: company name,
// 	description: company description,
// 	address: company address,
// 	phone: company phone number,
// 	website: company website
// }
