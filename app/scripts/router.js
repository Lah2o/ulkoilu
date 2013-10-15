/*global define*/
define(['backbone', 'views/map-view', 'views/haaste-view'], function(Backbone, MapView, HaasteView) {

    'use strict';

    var MainRouter = Backbone.Router.extend({

        routes: {
            '': 'home',
            ':page': 'showPage'
        },

        home: function() {
            this.mapView = this.mapView || new MapView();
            $('#page').html(this.mapView.render().el);
            this.mapView.renderMap();
        },

        showPage: function(page) {
            switch(page) {
            case 'haaste':
                this.haasteView = this.haasteView || new HaasteView();
                $('#page').html(this.haasteView.render().el);
                break;
            default:
                console.log('Tuntematon sivu ' + page);
                break;
            }
        }

    });

    return MainRouter;
});
