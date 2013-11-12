Package.describe({
    summary: 'Node-CSV wrapper'
});

Npm.depends({
    'csv': '0.3.6'
});

Package.on_use(function (api) {
    api.add_files('csv.js', 'server');

    api.export('csv');
});
