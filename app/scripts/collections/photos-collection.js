/*global define*/
define(['backbone', 'models/photo'], function(Backbone, Photo) {

    'use strict';

    var Photos = Backbone.Collection.extend({
        model: Photo
    });

    return Photos;
});
