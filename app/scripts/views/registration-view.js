/*global define*/
define(['backbone',], function(Backbone) {
    'use strict';

    var RegistrationView = Backbone.View.extend({

        render: function() {
            this.el.innerHTML='Rekisteröitymissivu!';
            console.log(this);
            return this;
        }
    });

    return RegistrationView;
});
