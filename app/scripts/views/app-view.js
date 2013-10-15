/*global define*/
define(['backbone', 'views/navigation-view'], function(Backbone, NavigationView) {

	'use strict';

	var AppView = Backbone.View.extend({

		el: 'body',

		render: function() {
			$('#main-navigation').html(
				new NavigationView().render().el
			);
			return this;
		}
	});

	return AppView;

});