(function() {
    'use strict';
    
    Lampa.Lang.add({
        my_plugins: {
            ru: "Мои плагины",
            en: "My Plugins",
            uk: "Мої плагіни",
            be: "Мае плагіны"
        }
    });

    function addStore() {
        if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="my_plugins"]').length) {
            var field = '<div class="settings-folder selector" data-component="my_plugins" data-static="true">' +
                '<div class="settings-folder__icon">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="white" d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>' +
                '</div>' +
                '<div class="settings-folder__name">' + Lampa.Lang.translate('my_plugins') + '</div>' +
                '</div>';
            Lampa.Settings.main().render().find('[data-component="more"]').after(field);
            Lampa.Settings.main().update();
        }
    }

    Lampa.Settings.listener.follow('open', function(e) {
        if (e.name == 'main') {
            e.body.find('[data-component="my_plugins"]').on('hover:enter', function() {
                Lampa.Extensions.show({
                    store: 'https://alexnew91.github.io/lampa-plugins/extensions.json?v=' + Date.now(),
                    with_installed: true
                });
            });
        }
    });

    if (window.appready) {
        addStore();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') addStore();
        });
    }
})();
