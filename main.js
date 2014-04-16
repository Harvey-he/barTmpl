require.config({
    baseUrl: '/',
    urlArgs: 'v=0.1.0'
});

require(
    [
        'app',
        'partials/sign/services/routeResolverSign',
        'partials/sys/services/routeResolverSys'
    ],
    function () {
        angular.bootstrap(document, ['barTmpl']);

    });
