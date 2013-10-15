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
            this.navItems = [
                { active: 'active', route: '', title: 'Etusivu'},
                { active: '', route: 'haaste', title: 'Haastesivu'}
            ];
        },

		render: function() {
			this.el.innerHTML = this.template({navItems: this.navItems});
			return this;
		}
	});

    return NavigationView;
});
