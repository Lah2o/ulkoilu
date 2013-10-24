/*global define*/
define([
    'backbone',
    'models/photo',
    'hbs!tmpl/instagram-photo'
], function(Backbone, PhotoModel, Template) {

    'use strict';

    var PhotoView = Backbone.View.extend({

        template: Template,
        className: 'photo-container',

        render: function() {
            this.el.innerHTML = this.template(this.model.toJSON());

            return this;
        }

    });

    return PhotoView;
});
