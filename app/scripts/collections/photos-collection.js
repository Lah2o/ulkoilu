/*global define*/
define(['backbone', 'models/photo'], function(Backbone, Photo) {

    'use strict';

    var Photos = Backbone.Collection.extend({
        model: Photo,

         instagram: {
            clientID: '9a8939f7e86e461abf6c0de1742642e6',
            tag: 'xplorepirkanmaa'
         },

         initialize: function() {
            this.fetch();
         },

         url: function() {
            return 'https://api.instagram.com/v1/tags/' + this.instagram.tag + '/media/recent?callback=?&client_id=' + this.instagram.clientID;
         },

         parse: function(response) {
            return response.data;
         }

    });

    return Photos;
});
