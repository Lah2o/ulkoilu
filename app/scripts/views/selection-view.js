/*global define*/
define([
    'backbone',
    'views/selection-item-view'
], function(Backbone, SelectionItemView){
    'use strict';

    var SelectionView = Backbone.View.extend({
        tagName: 'ul',
        id: 'selection-view',

        render: function() {
            this.collection.each(this.renderItem, this);
            return this;
        },

        renderItem: function(item, iterator) {
            this.$el.append(new SelectionItemView({ model: item }).render(iterator + 1).el);
        }
    });

    return SelectionView;
});
