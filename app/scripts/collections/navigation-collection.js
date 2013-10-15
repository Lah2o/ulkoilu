define([
    'backbone',
    'models/navigation-item'
], function(Backbone, NavItem) {

    var NavCollection = Backbone.Collection.extend({
        model: NavItem
    });

    return NavCollection;
});
