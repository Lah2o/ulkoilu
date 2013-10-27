/*global define*/
define([
    'backbone',
    'underscore',
    'collections/photos-collection',
    'hbs!tmpl/profiili',
    'hbs!tmpl/feed-item',
    'views/photo-view'
], function(Backbone, _, PhotosCollection, Template, FeedTemplate, PhotoView) {
    'use strict';

    var ProfileView = Backbone.View.extend({
        template: Template,
        feedItemTemplate: FeedTemplate,

        initialize: function() {
            this.collection.fetch();
            this.collection.on('sync', this.render, this);
        },

        render: function() {
            var userPhotos = _.filter(this.collection.toJSON(), function(photo) {
                return photo.user.username === 'lah2o';
            }, this);

            this.el.innerHTML = this.template({ photos: userPhotos });
            this.renderFeed();
            return this;
        },

        renderFeed: function() {
            var feedItems = [
                { otsikko: 'Uusi haaste', teksti: 'Kaverisi Kamu lisäsi uuden <a href="/photos/573912288630846083_454871195">haasteen</a>'},
                { otsikko: 'Ilmoittautuminen', teksti: 'Ilmoittauduit tapahtumaan Höntsäilypesistä Ahvenisjärven kentällä.'},
                { otsikko: 'Item', teksti: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, quas, sapiente, rerum deserunt nemo cupiditate dolorum a dignissimos commodi natus facilis quaerat magni numquam id laudantium aut ad doloribus ex?'},
                { otsikko: 'Item', teksti: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, quas, sapiente, rerum deserunt nemo cupiditate dolorum a dignissimos commodi natus facilis quaerat magni numquam id laudantium aut ad doloribus ex?'},
                { otsikko: 'Item', teksti: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, quas, sapiente, rerum deserunt nemo cupiditate dolorum a dignissimos commodi natus facilis quaerat magni numquam id laudantium aut ad doloribus ex?'},
                { otsikko: 'Item', teksti: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, quas, sapiente, rerum deserunt nemo cupiditate dolorum a dignissimos commodi natus facilis quaerat magni numquam id laudantium aut ad doloribus ex?'},
            ];

            _.each(feedItems, this.renderFeedItem, this);
            return this;
        },

        renderFeedItem: function(item) {
            this.$('.newsfeed').append(this.feedItemTemplate(item));
        },

        renderPhoto: function(photo) {
            if (photo.get('location') !== null) {
                this.el.appendChild( new PhotoView({ model: photo }).render().el );
            }
        }
    });
return ProfileView;
});
