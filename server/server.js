Meteor.methods({
    crawlCategories: function () {
        Crawl.categories();
    },
    crawlListings: function () {
        Crawl.listings();
    }
});

Meteor.startup( function () {
	if( Companies.find().count() === 0 ) {
		var mcfarlingData = {
			name: 'McFarling Foods',
			url: "mcfarling",
			description: "From our humble beginnings in 1948, McFarling Foods grew to become one of the largest independently-owned foodservice distributors in Indiana and a shareholder in Unipro Foodservice Inc., the world's largest foodservice cooperative. In 2009, we're celebrating our next step - becoming Indiana's largest 100% employee-owned food distributor. We are proud to say that when you call McFarling Foods, you're always speaking to an owner. Although our ownership structure has changed, our customers know they can expect the same commitment to service and quality brands that have helped the company become what it is today. McFarling Foods sells CODE, COMPANIONS, CORTONA, and WORLD HORIZON label products, in addition to hundreds of familiar national-labeled lines. McFarling Foods manufactures many products in our modern USDA-inspected meat and poultry departments. We have fresh seafood arriving daily and stock broadline inventories of fresh produce, fluid milk, and ice cream. Extensive frozen, canned, dry, disposable and chemical lines complete our product line. Our customers include renowned independent fine dining, deli, catering and concession, hospital and healthcare, industrial and institutional foodservice operators. McFarling Foods has provided national brands and programs through the local connection to our community for over a half-century. Arrange to visit our facility in Indianapolis. We'll show you our investment in the future.",
			address: "333 West 14th Street Indianapolis, IN 46202",
			phone: "(800) 622-9003",
			website: "http://www.mcfarling.com/"
		};
		Companies.insert(mcfarlingData);
	}
});