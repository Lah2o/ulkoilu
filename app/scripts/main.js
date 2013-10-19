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
            exports: 'Handlebars'
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
            deps: ['jquery']
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
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/bootstrap-collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/dropdown',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition',

        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        handlebars: '../bower_components/handlebars/handlebars',

        leaflet: '../bower_components/leaflet-dist/leaflet',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../bower_components/requirejs-text/text',
        tmpl: 'template',

        /* require handlebars plugin - Alex Sexton */
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
