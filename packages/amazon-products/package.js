Package.describe({
    summary: 'smart package for amazon\'s product search api'
});

Package.on_use(function (api) {
  api.add_files('amazon.js', 'server');
  api.export('Amazon');
});
