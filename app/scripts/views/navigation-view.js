/*global define*/
define([
    'backbone',
    'hbs!tmpl/navigation',
    'bootstrapCollapse'
], function(Backbone, Template) {

	'use strict';

    var NavigationView = Backbone.View.extend({
		className: 'navbar navbar-default navbar-fixed-top',
		template: Template,

        initialize: function() {
            Backbone.history.on('route', this.routeChanged, this);
            this.collection.on('change', this.render, this);
        },

        routeChanged: function(router, routeFunction, params) {
            this.collection.each(function(model) {
                model.set('active', '');
            });

            var routeName = params[0] || '';
            var activeRoute = this.collection.findWhere({route: routeName});
            if(activeRoute) activeRoute.set('active', 'active');
        },

		render: function() {
			this.el.innerHTML = this.template({navItems: this.collection.toJSON()});
			return this;
		}
	});

    return NavigationView;
});
