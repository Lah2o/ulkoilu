/*global define */
define([
    'backbone',
    'leaflet',
    'views/selection-view',
    'models/selection',
    'collections/selection-collection',
    'data/koirapuistot',
    'data/luontopolkurastit',
    'data/talviliukumaet',
    'data/pyoratiet',
    'data/kentat',
    'data/luontopolkureitit',
    'data/venerannat',
    'data/rullalautailu',
    'data/leikkipaikat',
    'https://raw.github.com/lvoogdt/Leaflet.awesome-markers/master/dist/leaflet.awesome-markers.js'
], function(Backbone, L, SelectionView, Selection, SelectionCollection, Koirapuistot, Luontopolkurastit, Talviliukumaet, Pyoratiet, Kentat, Luontopolkureitit, Venerannat, Rullalautailu, Leikkipaikat) {
    'use strict';

    var MapView = Backbone.View.extend({

        id: 'map-view',

        config: {
            appKey: '32fb713c6d034b4a9d8df1d4f0768b5b'
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
                var text = dataset[i].properties.ALUE_NIMI;
                layerGroup.addLayer(L.polygon(coordinates, options));
                layerGroup.addLayer(marker.bindPopup(text));
            }
            // group.addLayer(markers);
            return layerGroup;
        },

        drawPoints: function(dataset, ikoni) {
            var markers = [];
            for (var i = dataset.length - 1; i >= 0; i--) {
                var text = dataset[i].properties.ALUE_NIMI;
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
            this.map = L.map( 'map' ).setView([
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


            // drawLine(Pyoratiet.features);
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
                { name: 'Leikkipaikat'            , layer: this.leikkipaikat      }
            ]);

            this.$el.append(new SelectionView({ collection: selectionCollection }).render().el);

            return this;
        }
    });

    return MapView;

});
