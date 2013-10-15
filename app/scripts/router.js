/*global define*/
define(['backbone', 'views/map-view', 'views/haaste-view'], function(Backbone, MapView, HaasteView) {

    'use strict';

    var MainRouter = Backbone.Router.extend({

        routes: {
            '': 'showPage',
            ':page': 'showPage'
        },

        showPage: function(page) {
            page = page || '';
            switch(page) {
            case '':
                this.mapView = this.mapView || new MapView();
                $('#page').html(this.mapView.render().el);
                this.mapView.renderMap();
                break;
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
