/*global define*/
define(['backbone'], function(Backbone){
    'use strict';

    var LoginView = Backbone.View.extend({

        render: function() {
            this.el.innerHTML = '☃ < Hei täältä login-näkymästä!';
            return this;
        }

    });

    return LoginView;
});

