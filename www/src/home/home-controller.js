(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("HomeController", function ($scope, $timeout, $http, geoNavigationService, commonService, contactsService, uiGmapGoogleMapApi, $templateCache) {
        var vm = this;

        var isFirstTime = commonService.isFirstTime();
        if (isFirstTime) {
            //commonService.redirect('welcome');
        }

        // TODO remove this later on
        commonService.redirect('events');


        contactsService.getContacts()
            .success(function (data) {
                vm.data = data;
            });

        vm.clicker = function () {
            commonService.showAlert('Ha');

            $http.post('http://10.0.0.6:8000/', angular.toJson({
                data: vm.data
            }));
        };

        vm.createEvent = function () {

        };
    });


})();