/*global define*/
define([
    'backbone',
    'hbs!tmpl/create-event'
],
    function(Backbone, Template) {
    'use strict';

    var CreateEventView = Backbone.View.extend({

        template: Template,

        render: function() {
            this.el.innerHTML=this.template();
            console.log(this);
            return this;
        }
    });

    return CreateEventView;
});
