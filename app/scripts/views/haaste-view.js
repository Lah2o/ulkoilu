/*global define*/
define(['backbone'], function(Backbone) {

    'use strict';

    var HaasteView = Backbone.View.extend({

        tagName: 'h1',

        render: function() {
            this.el.innerHTML = 'Haastesivu olisi tässä';
            return this;
        }

    });

    return HaasteView;
});
