/*global define*/
define([
    'backbone',
    'hbs!tmpl/paikka',
    'data/koirapuistot',
    'data/luontopolkurastit',
    'data/talviliukumaet',
    'data/kentat',
    'data/luontopolkureitit',
    'data/venerannat',
    'data/rullalautailu',
    'data/leikkipaikat',
    'data/laavut'
],
    function(Backbone, Template, Koirapuistot, Luontopolkurastit, Talviliukumaet, Kentat, Luontopolkureitit, Venerannat, Rullalautailu, Leikkipaikat, Laavut) {
    'use strict';



    var PaikkaView = Backbone.View.extend({

        template: Template,


events: {
    'click #return': 'leavingView'
},

        render: function() {
            this.el.innerHTML=this.template();
            console.log(this.options.huolto);
            this.showInfo(Koirapuistot.features, 3);

            return this;
        },

           leavingView: function(route, params) {
                this.remove();
                window.App.Router.navigate('//');
            },

        showInfo: function(dataset, i) {
            var info_name = dataset[i].properties.ALUE_NIMI;
            var info_street = dataset[i].properties.ALUE_SIJ;
            var info_area = dataset[i].properties.KAUPUNGINOSA;
            var info_season = dataset[i].properties.KP_KAUSI;
            var info_usage = dataset[i].properties.TOIMLK;
            var info_usage_special = dataset[i].properties.ERITYISKAYTTO;
            var info_maintenance = dataset[i].properties.KUNNOSSAPITAJA;

           if (info_usage !== null && info_usage !== undefined) {
            this.$('#info-header').append(info_usage + ' : ');
           }
           if (info_name !== null && info_name !== undefined) {
            this.$('#info-header').append(info_name);
           }
           if (info_area !== null && info_area !== undefined) {
            this.$('#info-container').append('<tr>' + '<td>Sijainti</td>'
            + '<td>' + info_area + '</td>' + '</tr>');
           }
           if (info_street !== null && info_street !== undefined) {
            this.$('#info-container').append('<tr>' + '<td>Katu</td>'
            + '<td>' + info_street + '</td>' + '</tr>');
           }
           if (info_season !== null && info_season !== undefined) {
            this.$('#info-container').append('<tr>' + '<td>Käyttökausi</td>'
            + '<td>' + info_season + '</td>' + '</tr>');
           }
           if (info_usage_special !== null && info_usage_special !== undefined) {
            this.$('#info-container').append('<tr>' + '<td>Erityistä</td>'
            + '<td>' + info_usage_special + '</td>' + '</tr>');
           }
           if (info_maintenance !== null && info_maintenance !== undefined) {
            this.$('#info-container').append('<tr>' + '<td>Kunnossapitäjä</td>'
            + '<td>' + info_maintenance + '</td>' + '</tr>');
           }
        }


    });


    return PaikkaView;
});
