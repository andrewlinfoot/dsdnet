// {
// 	productNumber: int,
// 	stock: int,
// 	brand: string,
// 	pack: string,
// 	description: string,
// 	category: id,
// 	slug: string,
// }
Products = new Meteor.Collection('products');

// {
// 	code: int,
// 	description: string,
// 	type: string,
// 	parent: id
// }
Categories = new Meteor.Collection('categories');

// {
// 	address: string,
// 	description: string,
// 	name: string,
// 	phone: string,
// 	slug: string,
// 	website: url
// }
Companies = new Meteor.Collection('companies');
