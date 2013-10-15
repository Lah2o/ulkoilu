/*global define*/
define([
	'backbone',
	'views/navigation-view',
	'views/map-view'
], function(Backbone, NavigationView, MapView) {

	'use strict';

	var AppView = Backbone.View.extend({

		el: 'body',

		initialize: function() {
			this.mapView = new MapView();
		},

		render: function() {
			this.$el.prepend(
				new NavigationView().render().el
			);
			$('#page').html(
				this.mapView.el
			);
			return this;
		}
	});

	return AppView;

});