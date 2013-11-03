/*global define*/
define([
    'backbone',
    'hbs!tmpl/navigation',
    'hbs!tmpl/info-map',
    'hbs!tmpl/info-haaste',
    'views/login-view',
    'bootstrapCollapse',
    'bootstrapPopover'
], function(Backbone, Template, infoMapTemplate, infoHaasteTemplate, LoginView) {

    'use strict';

    var NavigationView = Backbone.View.extend({
        className: 'navbar navbar-default navbar-fixed-top',
        template: Template,

        popoverShown: false,

        events: {
            'click #info':'showInfo',
            'click #locale':'showEnglish',
            'click #login-button':'showLogin'
        },

        initialize: function() {
            Backbone.history.on('route', this.routeChanged, this);
            this.collection.on('change', this.render, this);
        },

        showLogin: function() {
            var loginView = new LoginView();
            if(this.popoverShown) {
                this.$('#popover-container').empty();
            }
            else {
                this.$('#popover-container').html( loginView.render().el );
            }
            this.popoverShown = ! this.popoverShown;
        },

        showInfo: function() {
            if (!document.getElementById('info-window')) {
                if (this.collection.findWhere({active: 'active'}) === this.collection.findWhere({title: 'Kartta'})) {
                    this.$el.append(infoMapTemplate);
                }
                else {
                    this.$el.append(infoHaasteTemplate);
                }
            }
            else
            {
                this.$('#info-window').remove();
            }
        },
        
        showEnglish: function() {
            if(!document.getElementById('eng-window')) {
                this.$el.append('<div class="alert alert-danger" id="eng-window">Translation in progress</div>');
            }
            else {
                this.$('#eng-window').remove();
            }
            
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
