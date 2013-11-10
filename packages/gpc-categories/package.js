Package.describe({
    summary: 'Add all the GPC categoies to the Categories Collection'
});

Package.on_use(function (api) {
  api.add_files('GPCCategories.js', 'server');
  api.export('AddGPCCategories');
});
