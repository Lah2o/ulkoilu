/*global define*/
define([
    'backbone',
    'hbs!tmpl/registration'
],
    function(Backbone, Template) {
    'use strict';

    var RegistrationView = Backbone.View.extend({

        template: Template,

        render: function() {
            this.el.innerHTML=this.template();
            console.log(this);
            return this;
        }
    });

    return RegistrationView;
});
