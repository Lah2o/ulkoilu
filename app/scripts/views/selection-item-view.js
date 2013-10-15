define(['backbone'], function(Backbone) {

    var ItemView = Backbone.View.extend({

        tagName: 'li',

        events: {
            'click .show-feature': 'activeStatusChanged'
        },

        activeStatusChanged: function(event) {
            this.model.set('active', !this.model.get('active'));
        },

        render: function() {
            var checked = this.model.get('active') === true ? 'checked' : '';
            this.$el.html(
                '<input type="checkbox" class="show-feature" ' + checked + '>' +
                this.model.get('name')
            );
            return this;
        }

    });

    return ItemView;
});
