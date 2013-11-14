Package.describe({
    summary: 'set dummy data to bread category in mongo'
});

Package.on_use(function (api) {
  api.use('node-jquery', 'server');
  api.add_files('kwikee.js', 'server');
  api.add_files('breadwriter.js', 'server');
  api.export('BreadWriter');
});
