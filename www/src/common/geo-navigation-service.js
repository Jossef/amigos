(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('geoNavigationService', GeoNavigationService);



    function GeoNavigationService($q, commonService, geolocation) {

        var geocoder = new google.maps.Geocoder();
        return {
            getCurrentLocation: getCurrentLocation,
            reverseGeoLookup: reverseGeoLookup
        };

        // ........

        function getCurrentLocation() {
            var def = $q.defer();

            geolocation.getLocation()
                .then(function (data) {
                    def.resolve({latitude: data.coords.latitude, longitude: data.coords.longitude});
                }, def.reject);

            return def.promise;
        }

        function reverseGeoLookup(latitude, longitude) {
            var def = $q.defer();

            latitude = parseFloat(latitude);
            longitude = parseFloat(longitude);
            var latlng = new google.maps.LatLng(latitude, longitude);

            geocoder.geocode({'latLng': latlng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        var address = results[1].formatted_address;
                        def.resolve(address);
                    } else {
                        def.reject();
                    }
                } else {
                    def.reject();
                }
            });

            return def.promise;
        }
    }

})();
