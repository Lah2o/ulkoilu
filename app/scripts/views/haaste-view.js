/*global define,_*/
define([
    'backbone',
    'collections/photos-collection',
    'views/photo-view',
    'hbs!tmpl/haaste'
], function(Backbone, PhotosCollection, PhotoView, Template) {

    'use strict';

    var HaasteView = Backbone.View.extend({

        template: Template,
        className: 'container haaste-container',
        limit: 12, // Kuinka monta kuvaa näytetään haastesivulla

        initialize: function() {
            this.collection.on('sync', this.render, this);
        },

        render: function() {
            this.el.innerHTML = this.template();
            _.each(this.collection.slice(0, this.limit), this.renderPhoto, this);
            return this;
        },

        renderPhoto: function(photo) {
            if (photo.get('location') !== null) {
            this.el.appendChild( new PhotoView({ model: photo }).render().el );
            }
        }

    });

    return HaasteView;
});
