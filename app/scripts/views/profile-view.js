/*global define*/
define(['backbone',], function(Backbone) {
    'use strict';

    var ProfileView = Backbone.View.extend({

        render: function() {
            this.el.innerHTML='Profiilisivu!';
            console.log(this);
            return this;
        }
    });

    return ProfileView;
});
