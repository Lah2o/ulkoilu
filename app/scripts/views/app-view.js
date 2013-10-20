/*global define*/
define([
	'backbone',
    'collections/navigation-collection',
    'models/navigation-item',
	'views/navigation-view',
], function(Backbone, NavCollection, NavModel, NavigationView) {

	'use strict';

	var AppView = Backbone.View.extend({

		el: 'body',

		initialize: function() {
			Backbone.history.start();
            this.navItems = new NavCollection([
                { route: '', title: 'Kartta' },
                { route: 'haaste', title: 'Haastesivu' }
            ]);
            var currentItem = this.navItems.findWhere({route: Backbone.history.fragment});
            if( currentItem ) currentItem.set('active', 'active');
		},

		render: function() {
			this.$el.prepend(
				new NavigationView({collection: this.navItems}).render().el
			);
			return this;
		}
	});

	return AppView;

});
