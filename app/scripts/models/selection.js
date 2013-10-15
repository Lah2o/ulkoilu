/*global define*/
define(['backbone'], function(Backbone) {

    'use strict';

    var Selection = Backbone.Model.extend({
        defaults: {
            active: false,
            name: ''
        }
    });

    return Selection;
});
