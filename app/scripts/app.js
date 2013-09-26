/*global define */
define(['leaflet', 'data/koirapuistot', 'data/luontopolkurastit'], function(L, Koirapuistot, Luontopolkurastit) {
    'use strict';

    var Config = {
        appKey: '32fb713c6d034b4a9d8df1d4f0768b5b'
    };

    var drawPolygons = function(dataset) {
        for (var i = dataset.length - 1; i >= 0; i--) {
            var area = (dataset[i].geometry.coordinates[0]);
            var coordinates = [];

            for (var j = area.length - 1; j >= 0; j--) {
                coordinates.push([area[j][1], area[j][0]]);
            }
            // Nyt meillä on yhden alueen koordinaatit oikein päin 
            // muuttujassa coordinates
            // Lisätään polygoni karttaan
            L.polygon(coordinates).addTo(window.map);
        }
    };

    var drawPoints = function(dataset) {
        for (var i = dataset.length - 1; i >= 0; i--) {
            var point = dataset[i].geometry.coordinates;
            L.marker([
                dataset[i].geometry.coordinates[1],
                dataset[i].geometry.coordinates[0]
            ]).addTo(window.map);
        }
    };

    var drawMap = function(position) {
        window.map = L.map('map').setView([
            //keskitetään käyttäjän olinpaikkaan
            position.coords.latitude,
            position.coords.longitude
        ], 13);

        L.tileLayer('http://{s}.tile.cloudmade.com/' + Config.appKey + '/997/256/{z}/{x}/{y}.png', {
            attribution: '',
            maxZoom: 18
        }).addTo(map);

        var marker = L.marker([
            position.coords.latitude,
            position.coords.longitude
        ]).addTo(map);

        drawPolygons(Koirapuistot.features);
        drawPoints(Luontopolkurastit.features);
    };

    var userLocation = navigator.geolocation.getCurrentPosition(drawMap.bind(this));
});