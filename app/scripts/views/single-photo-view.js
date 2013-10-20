/*global define*/
define([
    'backbone',
    'hbs!tmpl/kuva'
], function(Backbone, Template) {

        'use strict';
        var KuvaView = Backbone.View.extend({

            id: 'fullscreen',
            className: 'fullscreen',

            template: Template,

            events: {
               'click #vastaa': 'checkLocation',
               'click .shroud': 'leavingView',
               'click .photo-single': 'leavingView'
            },

            initialize: function() {

            },

            leavingView: function(route, params) {
                this.remove();
                window.App.Router.navigate('//haaste');
            },

            render: function() {
                this.$el.append(this.template(this.model.toJSON()));
                return this;
            },

            updatePosition: function(position) {
                window.App.userLocation = position;
                this.checkCorrectAnswer(position);
            },

            checkLocation: function(model) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.updatePosition.bind(this));
                }
                else {
                    this.$el.append('<div class="alert alert-info">Selaimesi ei tue paikannusta!');
                }
            },

            checkCorrectAnswer: function(userLocation) {
                Number.prototype.toRad = function() {
                    return this * Math.PI / 180;
                };

                var lat1 = userLocation.coords.latitude.toRad();
                var lon1 = userLocation.coords.longitude.toRad();
                var lat2 = this.model.get('location').latitude.toRad();
                var lon2 = this.model.get('location').longitude.toRad();

                var R = 6371; // km
                var x = ( lon2 - lon1 ) * Math.cos((lat1 + lat2 )/2);
                var y = ( lat2 - lat1 );
                var d = Math.sqrt(x*x + y*y) * R;

                if (d <= 0.2) {
                    this.$('#answer').append('<div class="alert alert-success">Oikein! 1 piste.</div>');
                    }
                else if (d <= 0.5) {
                    this.$('#answer').append('<div class="alert alert-warning">Läheltä liippaa! Etäisyys on alle 500 metriä kuvasta.</div>');
                    }
                else {
                    this.$('#answer').append('<div class="alert alert-danger">Väärä sijainti!</div>');
                }
           }

       });

       return KuvaView;
    });
