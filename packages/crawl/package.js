Package.describe({
    summary: 'Crawler'
});

Package.on_use(function (api) {
    api.use('node-jquery', 'server');

    api.add_files('crawl.js', 'server');

    api.export('Crawl');
});