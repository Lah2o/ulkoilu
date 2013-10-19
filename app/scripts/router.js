/*global define*/
define([
    'backbone',
    'views/map-view',
    'views/haaste-view',
    'views/kuva-view',
    'models/photo'
], function(Backbone, MapView, HaasteView, KuvaView, photo) {

    'use strict';

    var MainRouter = Backbone.Router.extend({

        routes: {
            '': 'showPage',
            ':page': 'showPage'
        },

        initialize: function() {
            window.App.Vent.on('showSinglePhoto', this.photoDetails, this);
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
            case 'kuva':
                this.kuvaView = this.kuvaView || new kuvaView();
                $('#page').html(this.kuvaView.render().el);
                break;
            default:
                console.log('Tuntematon sivu ' + page);
                break;
            }
        },

        photoDetails: function(options) {
            this.kuvaView = new KuvaView({model: options.model});
            $('#page').html(this.kuvaView.render().el);
        }
    });

    return MainRouter;
});
