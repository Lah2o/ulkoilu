/*global define */
define(['leaflet'], function(L) {
    'use strict';

    var Config = {
        appKey: '32fb713c6d034b4a9d8df1d4f0768b5b'
    };

    var drawMap = function(position) {
        var map = L.map('map').setView([
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

        var marker2 = L.marker ([68.23444806532111,24.479046098939348]).addTo(map);

    };

    var userLocation = navigator.geolocation.getCurrentPosition(drawMap.bind(this));
});