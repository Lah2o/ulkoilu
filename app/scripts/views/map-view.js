/*global define */
define([
    'backbone',
    'leaflet',
    'views/selection-view',
    'views/paikka-view',
    'models/selection',
    'collections/selection-collection',
    'data/koirapuistot',
    'data/luontopolkurastit',
    'data/talviliukumaet',
    'data/kentat',
    'data/luontopolkureitit',
    'data/venerannat',
    'data/rullalautailu',
    'data/leikkipaikat',
    'data/laavut',
    'https://raw.github.com/lvoogdt/Leaflet.awesome-markers/master/dist/leaflet.awesome-markers.js'
], function(Backbone, L, SelectionView, PaikkaView, Selection, SelectionCollection, Koirapuistot, Luontopolkurastit, Talviliukumaet, Kentat, Luontopolkureitit, Venerannat, Rullalautailu, Leikkipaikat, Laavut) {
    'use strict';

    var MapView = Backbone.View.extend({

        id: 'map-view',

        config: {
            appKey: '32fb713c6d034b4a9d8df1d4f0768b5b'
        },

events : {

    'click #check-in': 'checkIn',
    'click #show-info': 'showLocInfo'
},

        initialize: function() {
            window.App.Vent.on('filterChanged', this.filterChanged, this);
            this.luontopolkurastit = this.drawPoints  (Luontopolkurastit.features, {icon: 'icon-compass', color: 'green', spin:false});
            this.talviliukumaet    = this.drawPoints  (Talviliukumaet.features, {icon: 'icon-asterisk', color: 'blue', spin:false});
            this.luontopolkureitit = this.drawLine    (Luontopolkureitit.features,{color: 'hotpink'});
            this.koirapuistot      = this.drawPolygons(Koirapuistot.features, {color: 'hotpink'}, {icon: 'icon-cloud', color: 'purple', spin:false});
            this.pelikentat        = this.drawPolygons(Kentat.features, {color: 'hotpink'}, {icon: 'icon-play-circle', color: 'orange', spin:false});
            this.venerannat        = this.drawPolygons(Venerannat.features, {color: 'turquoise' }, {icon: 'icon-tint', color: 'darkblue', spin:false});
            this.rullalautailu     = this.drawPoints  (Rullalautailu.features, {icon: 'icon-repeat', color: 'darkred'});
            this.leikkipaikat      = this.drawPoints  (Leikkipaikat.features, {icon: 'icon-heart', color: 'cadetblue'});
            this.laavut            = this.drawLaavut  (Laavut, {icon: 'icon-leaf', color: 'orange'});
        },

checkIn: function (event) {
    var pancakes = $(event.target).data('rajapinta');
 console.log(pancakes);
},

showLocInfo: function(event) {
    var nimi = $(event.target).data('nimi');
    var katu = $(event.target).data('katu');
    var paikka = $(event.target).data('paikka');
    var kaytto = $(event.target).data('kaytto');
    var kausi = $(event.target).data('kausi');
    var erikois = $(event.target).data('erikois');
    var huolto = $(event.target).data('huolto');
    console.log(nimi, katu, paikka, kaytto, kausi, erikois, huolto);
     $('#page').html(new PaikkaView({nimi:nimi, katu:katu, paikka:paikka, kaytto:kaytto, kausi:kausi, erikois:erikois, huolto:huolto}).render().el);
},

        filterChanged: function(model) {
            return model.get('active') ? this.map.addLayer(model.get('layer')) : this.map.removeLayer(model.get('layer'));
        },


        drawPolygons: function(dataset, options, ikoni) {
            options = options || {};
            var polygons = [];
            var markers = [];
            var layerGroup = new L.LayerGroup();

            for (var i = dataset.length - 1; i >= 0; i--) {
                var marker;
                if(!dataset[i].geometry) {
                    continue;
                }
                var area = (dataset[i].geometry.coordinates[0]);
                var coordinates = [];

                for (var j = area.length - 1; j >= 0; j--) {
                    coordinates.push([area[j][1], area[j][0]]);
                }
                marker = L.marker([
                    area[0][1],
                    area[0][0]
                ], {icon: L.AwesomeMarkers.icon(ikoni) }).bindPopup(text);
                // Nyt meillä on yhden alueen koordinaatit oikein päin
                // muuttujassa coordinates
                // Lisätään polygoni karttaan
                // Lisätään polygoneihin popup, joka esittää alueen nimen
                var text =  dataset[i].properties.ALUE_NIMI + '<br>' + '<div class="btn-group" id="buttons">' +
                            '<button type="button" class="btn btn-success" id="check-in" data-nimi="' + dataset[i].properties.ALUE_NIMI + '">Check-in</button>' +
                            '<button type="button" class="btn btn-info" id="show-info" data-nimi="' + dataset[i].properties.ALUE_NIMI
                            + '" data-katu="' + dataset[i].properties.ALUE_SIJ + '" data-paikka="'+ dataset[i].properties.KAUPUNGINOSA
                            + '" data-kausi="'+ dataset[i].properties.KP_KAUSI +'" data-kaytto="'+ dataset[i].properties.TOIMLK
                            + '" data-erikois="'+ dataset[i].properties.ERITYISKAYTTO + '" data-huolto="'+ dataset[i].properties.KUNNOSSAPITAJA
                            + '" ->Info</button></div>';
                layerGroup.addLayer(L.polygon(coordinates, options));
                layerGroup.addLayer(marker.bindPopup(text));
            }
            // group.addLayer(markers);
            return layerGroup;
        },

        drawPoints: function(dataset, ikoni) {
            var markers = [];
            for (var i = dataset.length - 1; i >= 0; i--) {
                var text =  dataset[i].properties.ALUE_NIMI + '<br>' + '<div class="btn-group" id="buttons">' +
                            '<button type="button" class="btn btn-success" id="check-in">Check-in</button>' +
                            '<button type="button" class="btn btn-info" id="show-info">Info</button></div>';

                if(!dataset[i].geometry) {
                    continue;
                }
                var marker = L.marker([
                    dataset[i].geometry.coordinates[1],
                    dataset[i].geometry.coordinates[0]
                ], {icon: L.AwesomeMarkers.icon(ikoni) }).bindPopup(text);

                markers.push(marker);
            }

            return L.layerGroup(markers);
        },

        drawLine: function(dataset) {
            var lines = [];
            for (var i = dataset.length - 1; i >= 0; i--) {

                var line = [];
                if(!dataset[i].geometry) {
                    continue;
                }
                for (var j = dataset[i].geometry.coordinates.length - 1; j >= 0; j--) {
                    line.push(new L.LatLng(
                        dataset[i].geometry.coordinates[j][1],
                        dataset[i].geometry.coordinates[j][0]
                    ));
                }
                // Viivan koordinaatit ovat oikein päin
                lines.push(L.polyline(line));
            }
            return L.layerGroup(lines);
        },

        renderMap: function() {
            var position = window.App.userLocation;
            this.map = L.map( 'map', {
                attributionControl: false
            } ).setView([
                //keskitetään käyttäjän olinpaikkaan
                position.coords.latitude,
                position.coords.longitude
            ], 13);

            L.tileLayer('http://{s}.tile.cloudmade.com/' + this.config.appKey + '/997/256/{z}/{x}/{y}.png', {
                attribution: '',
                maxZoom: 18
            }).addTo(this.map);

            if( ! position.usingDefaultLocation ) {
                L.marker([
                    position.coords.latitude,
                    position.coords.longitude
                ], {icon: L.AwesomeMarkers.icon({icon: 'icon-user', color: 'red', spin:true}) }).addTo(this.map);
            }

            new L.Control.Attribution({
                prefix: '<a href="lisenssi.html">Lisenssi</a>'
            }).addTo(this.map);

            // drawLine(Pyoratiet.features);
        },

        drawLaavut: function(xml, ikoni) {
            var markers = [];
            var view = this;

            $(xml).find('wpt').each(function() {
                var name = $(this).find('name')[0] ? $(this).find('name')[0].innerHTML : '';
                var sym  = $(this).find('sym')[0]  ? $(this).find('sym')[0].innerHTML  : '';
                var desc = $(this).find('desc')[0] ? $(this).find('desc')[0].innerHTML  : '';
                markers.push(L.marker([
                    $(this).attr('lat'),
                    $(this).attr('lon')
                ], {icon: L.AwesomeMarkers.icon(ikoni) }).bindPopup(
                    '<strong>' + name + '</strong><br>' +
                    sym + '<br>' +
                    desc
                ));
            });

            return L.layerGroup(markers);
        },

        render: function() {
            this.$el.html('<div id="map"></div>');
            var selectionCollection = new SelectionCollection([
                { name: 'Luontopolkurastit'       , layer: this.luontopolkurastit },
                { name: 'Luontopolkureitit'       , layer: this.luontopolkureitit },
                { name: 'Koirapuistot'            , layer: this.koirapuistot      },
                { name: 'Talviliukumäet'          , layer: this.talviliukumaet    },
                { name: 'Peli- ja palloilukentät' , layer: this.pelikentat        },
                { name: 'Soutuvenerannat'         , layer: this.venerannat        },
                { name: 'Rullalautailualueet'     , layer: this.rullalautailu     },
                { name: 'Leikkipaikat'            , layer: this.leikkipaikat      },
                { name: 'Laavut'                  , layer: this.laavut            }
            ]);

            this.$el.append(new SelectionView({ collection: selectionCollection }).render().el);
            return this;
        }
    });

    return MapView;

});
