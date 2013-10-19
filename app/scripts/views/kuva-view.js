/*global define*/
define([
    'backbone',
    'hbs!tmpl/kuva'
], function(Backbone, Template) {

    'use strict';
    
       var HaasteView = Backbone.View.extend({

        template: Template,
        
       })
       
   $('#photo-single').append(new PhotoView(this.photo).render().el);
           
           events: {
               'click .btn btn-default': 'checkLocation',
           }
           
           checkLocation function(this.photo) {
            //hankitaan lokaatio
            // etaisyys = sqrt(longdiff^2+latidiff^2)
           //vääristymää kohti napoja, mutta pienillä luvuilla marginaalista. Verrattaen kevyt kuin tarkemmat laskentatavat
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
