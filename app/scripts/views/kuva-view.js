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
            else{x.innerHTML="Geolocation is not supported by this browser.";}
        
            var lat1 = position.coords.latitude; 
            var lon1 = position.coords.longitude; 
            var lat2 =
            var lon2 = 
            
            var R = 6371; // km
            var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
            var y = (lat2-lat1);
            var d = Math.sqrt(x*x + y*y) * R;
               
           if (d <== 0.2) {
           // Oikein
               }
               else if (d <== 0.5) {
           // Lähellä
               }
               else {
        //Väärin
               }
           }
        
       })
       
       return KuvaView;
    });
