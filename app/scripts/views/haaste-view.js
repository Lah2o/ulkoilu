/*global define*/
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

        initialize: function() {
            this.collection.on('sync', this.render, this);
        },

        render: function() {
            this.el.innerHTML = this.template();
            this.collection.each(this.renderPhoto, this);
            return this;
        },

        renderPhoto: function(photo) {
            this.el.appendChild( new PhotoView({ model: photo }).render().el );
        }

    });

    return HaasteView;
});
