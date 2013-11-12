Package.describe({
  summary: 'Add all the GPC categories to the Categories Collection'
});

Package.on_use(function (api) {
  api.use('node-csv', 'server');
  api.add_files('GPCCategories.js', 'server');
  api.add_files('gpc-data.csv', 'server');
  api.export('AddGPCCategories');
});
