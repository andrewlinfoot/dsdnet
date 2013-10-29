Package.describe({
    summary: 'Crawl McFarlings\' products listings and populate databases'
});

Package.on_use(function (api) {
  api.use('node-jquery', 'server');
  api.add_files('company_data.js', 'server');
  api.add_files('crawl.js', 'server');
  api.export('CrawlMcFarlings');
});
