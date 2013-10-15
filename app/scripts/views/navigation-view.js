/*global define*/
define(['backbone', 'hbs!tmpl/navigation'], function(Backbone, Template) {

	'use strict';
   
    var NavigationView = Backbone.View.extend({
		tagName: 'nav',
		className: 'navbar navbar-default navbar-fixed-top',
		template: Template,

		render: function() {
			this.el.innerHTML = this.template();
			return this;
		}
	});
   
    return NavigationView;
});