/*global define*/
define(['backbone', 'hbs!tmpl/login'], function(Backbone, Template){
    'use strict';

    var LoginView = Backbone.View.extend({

        tagName: 'form',
        template: Template,

        render: function() {
            this.el.innerHTML = this.template();
            return this;
        }

    });

    return LoginView;
});

