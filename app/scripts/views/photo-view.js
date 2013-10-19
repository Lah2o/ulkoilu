/*global define*/
define([
    'backbone',
    'models/photo',
    'hbs!tmpl/instagram-photo'
], function(Backbone, PhotoModel, Template) {

    'use strict';

    var PhotoView = Backbone.View.extend({

        template: Template,

        events: {
            'click .instagram-photo': 'showSinglePhoto'
        },

        showSinglePhoto: function(event) {
            event.preventDefault();
            window.App.Vent.trigger('showSinglePhoto', {model: this.model});
            console.log(this.model);
        },

        render: function() {
            this.el.innerHTML = this.template(this.model.toJSON());

            return this;
        }

    });

    return PhotoView;
});
