/*global define*/
define([
	'backbone',
	'views/navigation-view',
], function(Backbone, NavigationView) {

	'use strict';

	var AppView = Backbone.View.extend({

		el: 'body',

		initialize: function() {
			Backbone.history.start();
		},

		render: function() {
			this.$el.prepend(
				new NavigationView().render().el
			);
			return this;
		}
	});

	return AppView;

});