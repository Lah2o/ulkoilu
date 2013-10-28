require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        handlebars: {
            deps: [],
        },

        bootstrapAffix: {
            deps: ['jquery']
        },
        bootstrapAlert: {
            deps: ['jquery']
        },
        bootstrapButton: {
            deps: ['jquery']
        },
        bootstrapCarousel: {
            deps: ['jquery']
        },
        bootstrapCollapse: {
            deps: ['jquery']
        },
        bootstrapDropdown: {
            deps: ['jquery']
        },
        bootstrapPopover: {
            deps: ['bootstrapTooltip', 'jquery']
        },
        bootstrapScrollspy: {
            deps: ['jquery']
        },
        bootstrapTab: {
            deps: ['jquery']
        },
        bootstrapTooltip: {
            deps: ['jquery']
        },
        bootstrapTransition: {
            deps: ['jquery']
        }
    },

    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrapAffix: '../bower_components/sass-bootstrap/js/bootstrap-affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/bootstrap-alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/bootstrap-button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/bootstrap-carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/bootstrap-collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/bootstrap-dropdown',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/bootstrap-popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/bootstrap-scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/bootstrap-tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/bootstrap-tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/bootstrap-transition',

        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',

        leaflet: '../bower_components/leaflet-dist/leaflet',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../bower_components/requirejs-text/text',
        tmpl: 'template',

       /* Handlebars */
        handlebars: '../bower_components/require-handlebars-plugin/Handlebars',
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../bower_components/require-handlebars-plugin/hbs/json2',
        hbs: '../bower_components/require-handlebars-plugin/hbs',
    },

    hbs: {
        disableI18n: true
    },

});

require(['backbone', 'router', 'views/app-view'], function (Backbone, MainRouter, AppView) {
    'use strict';

    var start = function(position) {
        window.App.userLocation = position;
        new AppView().render();
    };

    var locationError = function() {
        window.App.userLocation = {
            coords: {
                latitude: 61.49811,
                longitude: 23.760889
            },
            usingDefaultLocation: true
        };
        new AppView().render();
    };

    window.App = {
        Vent: _.extend({}, Backbone.Events),
    };

    window.App.Router = new MainRouter(),

    // getCurrentPosition(funktioJosOnnistui, funktioJosVirhe);
    navigator.geolocation.getCurrentPosition(start, locationError);
});
