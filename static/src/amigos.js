(function () {
    'use strict';

    var app = angular.module('amigos', [
        'ngAnimate',
        'ngRoute',
        'ngMaterial',
        'ngMdIcons'
    ]);

    // ......................................................
    // SPA URL Route states
    app.config(
        function ($routeProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: "/static/src/home/home-view.html",
                    controller: 'HomeController'
                })
                .when('/users', {
                    templateUrl: "/static/src/users/user-view.html",
                    controller: 'UserController'
                })
                .when('/login', {
                    templateUrl: "/static/src/login/login-view.html",
                    controller: 'LoginController'
                })
                .when('/events', {
                    templateUrl: "/static/src/event/events-view.html",
                    controller: 'EventsController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });

    // ......................................................
    // Promises Fix
    app.config(
        function ($provide) {
            $provide.decorator('$q', function ($delegate) {
                var defer = $delegate.defer;
                $delegate.defer = function () {
                    var deferred = defer();
                    deferred.promise.success = function (fn) {
                        deferred.promise.then(fn);
                        return deferred.promise;
                    };
                    deferred.promise.error = function (fn) {
                        deferred.promise.then(null, fn);
                        return deferred.promise;
                    };
                    return deferred;
                };
                return $delegate;
            });
        });

    app.config(function ($mdThemingProvider, $mdIconProvider) {

        $mdIconProvider
            .defaultIconSet("/static/assets/svg/avatars.svg", 128)
            .icon("menu", "/static/assets/svg/menu.svg", 24)
            .icon("share", "/static/assets/svg/share.svg", 24)
            .icon("google_plus", "/static/assets/svg/google_plus.svg", 512)
            .icon("hangouts", "/static/assets/svg/hangouts.svg", 512)
            .icon("twitter", "/static/assets/svg/twitter.svg", 512)
            .icon("phone", "/static/assets/svg/phone.svg", 512);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal', {
                'default': '500', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            .accentPalette('red');
    });

})();