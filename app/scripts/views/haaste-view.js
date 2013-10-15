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

        Instagram: {
            Config: {
                clientID: '855564953b9b42548b43d3946af5add3',
                apiHost: 'https://api.instagram.com'
            }
        },

        search: function(tag) {
            this.resource = this.generateResource(tag);
            $.getJSON(this.resource(), this.createModels);
        },

        createModels: function(photos) {
            this.photosCollection = new PhotosCollection(photos.data);
            console.log(this.photosCollection.toJSON());

            this.photosCollection.each(function(model) {
                $('#photos-wrap').append(new PhotoView({model: model}).render().el);
            }, this);
        },

        generateResource: function(tag){
            var url = this.Instagram.Config.apiHost + '/v1/tags/' + tag + '/media/recent?callback=?&client_id=' + this.Instagram.Config.clientID;

            return function(maxId){
                var next_page;
                if(typeof maxId === 'string' && maxId.trim() !== '') {
                    next_page = url + '&max_id=' + maxId;
                }
                return next_page || url;
            };
        },

        render: function() {
            this.search('cats');
            this.el.innerHTML = this.template();
            return this;
        }

    });

    return HaasteView;
});
