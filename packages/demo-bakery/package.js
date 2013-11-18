Package.describe({
    summary: 'set dummy data to bread category in mongo'
});

Package.on_use(function (api) {
  api.use('cheerio', 'server');
  api.add_files('breadwriter.js', 'server');
  api.export('BreadWriter');
});
