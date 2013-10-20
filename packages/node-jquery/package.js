Package.describe({
    summary: 'Node jQuery wrapper'
});

Npm.depends({
    'jquery': '1.8.3'
});

Package.on_use(function (api) {
    api.add_files('jquery.js', 'server');

    api.export('$');
});