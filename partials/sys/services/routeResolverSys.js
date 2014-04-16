/**
 * Created by harvey on 4/16/14.
 */
'use strict';

define([], function () {

    var services = angular.module('routeResolverSysServices', []);

    //Must be a provider since it will be injected into module.config()
    services.provider('routeResolverSys', function () {

        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var viewsDirectory = '/partials/sys/views/',
                controllersDirectory = '/partials/sys/controllers/',

                setBaseDirectories = function (viewsDir, controllersDir) {
                    viewsDirectory = viewsDir;
                    controllersDirectory = controllersDir;
                },

                getViewsDirectory = function () {
                    return viewsDirectory;
                },

                getControllersDirectory = function () {
                    return controllersDirectory;
                };

            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }();

        this.route = function (routeConfig) {

            var resolve = function (baseName, path) {
                    if (!path) path = '';

                    var routeDef = {};
                    routeDef.templateUrl = routeConfig.getViewsDirectory() + path + baseName + '.html';
                    routeDef.controller = baseName + 'Controller';
                    routeDef.resolve = {
                        load: ['$q', '$rootScope', function ($q, $rootScope) {
                            var dependencies = [routeConfig.getControllersDirectory() + path + baseName + 'Controller.js'];
                            return resolveDependencies($q, $rootScope, dependencies);
                        }]
                    };

                    return routeDef;
                },

                resolveDependencies = function ($q, $rootScope, dependencies) {
                    var defer = $q.defer();
                    require(dependencies, function () {
                        defer.resolve();
                        $rootScope.$apply()
                    });

                    return defer.promise;
                };

            return {
                resolve: resolve
            }
        }(this.routeConfig);
    });

});

