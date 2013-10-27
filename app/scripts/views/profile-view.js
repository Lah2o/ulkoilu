/*global define*/
define([
    'backbone',
    'underscore',
    'collections/photos-collection',
    'hbs!tmpl/profiili'
], function(Backbone, _, PhotosCollection, Template) {
    'use strict';

    var ProfileView = Backbone.View.extend({
        template: Template,

        initialize: function() {
            this.collection.fetch();
            this.collection.on('sync', this.render, this);
        },

        render: function() {
            var userPhotos = _.filter(this.collection.toJSON(), function(photo) {
                return photo.user.username === 'lah2o';
            }, this);

            this.el.innerHTML = this.template({ photos: userPhotos });
            console.log(this.collection.toJSON());
            return this;
        }
    });

    return ProfileView;
});
