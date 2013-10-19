/*global define*/
define(['backbone'], function(Backbone) {

    'use strict';

    var ItemView = Backbone.View.extend({

        tagName: 'li',

        events: {
            'click .show-feature': 'activeStatusChanged'
        },

        activeStatusChanged: function() {
            this.model.set('active', !this.model.get('active'));
            window.App.Vent.trigger( 'filterChanged', this.model );
        },

        render: function(count) {
            var checked = this.model.get('active') === true ? 'checked' : '';
            this.$el.html(
                '<input id="item-' + count + '" type="checkbox" class="show-feature" ' + checked + '>' +
                '<label for="item-' + count + '">' + this.model.get('name') + '</label>'
            );
            return this;
        }

    });

    return ItemView;
});
