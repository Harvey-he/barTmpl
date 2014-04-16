/**
 * Created by harvey on 4/15/14.
 */

'use strict';

define(
    [
        'partials/sign/services/routeResolverSign',
        'partials/sys/services/routeResolverSys'
    ],
    function () {

        var app = angular.module(
            'barTmpl',
            [
                'ngRoute',
                'ui.router',
                'routeResolverSysServices',
                'routeResolverSignServices'
            ]);

        app.config(
            [
                '$routeProvider',
                'routeResolverSysProvider',
                'routeResolverSignProvider',
                '$controllerProvider',
                '$compileProvider',
                '$filterProvider',
                '$provide',
                '$httpProvider',
                '$stateProvider',
                '$urlRouterProvider',
                function (
                    $routeProvider,
                    routeResolverSysProvider,
                    routeResolverSignProvider,
                    $controllerProvider,
                    $compileProvider,
                    $filterProvider,
                    $provide,
                    $httpProvider,
                    $stateProvider,
                    $urlRouterProvider
                    ) {

                    app.register =
                    {

                        controller: $controllerProvider.register,
                        directive: $compileProvider.directive,
                        filter: $filterProvider.register,
                        factory: $provide.factory,
                        service: $provide.service
                    };

                    var routeSys = routeResolverSysProvider.route;
                    var routeSign = routeResolverSignProvider.route;

                    var resolveHandle = function(url, routeName, baseName, path) {
                        if (!path) path = '';

                        var resolve = routeName.resolve(baseName, path);
                        resolve.url = url;

                        return resolve;
                    };

                    $urlRouterProvider.otherwise("/sys/home");

                    $stateProvider
                        .state('sign', resolveHandle('/sign', routeSign, 'sign'))
                        .state('sign.signin', resolveHandle('/signin', routeSign, 'signin','signin/'))
                        .state('sign.register', resolveHandle('/register', routeSign, 'register','register/'))
                        .state('sys',resolveHandle('/sys', routeSys, 'sys'))
                        .state('sys.home', resolveHandle('/home', routeSys, 'home', 'home/'))
                        .state('sys.about', resolveHandle('/about', routeSys, 'about', 'about/'))
                        .state('sys.contact', resolveHandle('/contact', routeSys, 'contact', 'contact/'));

                }]);

        app.run(['$q', '$rootScope', '$http', '$state', '$stateParams',
            function ($q, $rootScope, $http, $state, $stateParams) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

            }]);

        return app;

    });
