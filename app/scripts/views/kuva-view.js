/*global define*/
define([
    'backbone',
    'hbs!tmpl/kuva'
], function(Backbone, Template) {

        'use strict';
        var HaasteView = Backbone.View.extend({

            template: Template,
        })
       
        $('#photo-single').append(new PhotoView(this.model).render().el);
           
        events: {
               'click .btn btn-default': 'checkLocation',
        }
           
        checkLocation function(this.model) {
               
            if (navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
            else {
                $('#answer').append('<div class="alert alert-info">Selaimesi ei tue paikannusta!'.render().el);
                }
        
            var lat1 = position.coords.latitude; 
            var lon1 = position.coords.longitude; 
            var lat2 = model.get('latitude');
            var lon2 = model.get('longitude');
            
            var R = 6371; // km
            var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
            var y = (lat2-lat1);
            var d = Math.sqrt(x*x + y*y) * R;
               
            if (d <== 0.2) {
                $('#answer').append('<div class="alert alert-success">Oikein! 1 piste.</div>'.render().el);
                }
            else if (d <== 0.5) {
                $('#answer').append('<div class="alert alert-warning">Läheltä liippaa! Etäisyys on alle 500 metriä kuvasta.</div>'.render().el);
                }
            else {
                $('#answer').append('<div class="alert alert-danger">Väärä sijainti!</div>'.render().el);
                }
           }
        
       })
       
       return KuvaView;
    });
