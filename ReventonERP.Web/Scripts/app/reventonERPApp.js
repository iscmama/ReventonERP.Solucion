(function () {
    'use strict';

    angular
        .module('reventonERPApp')
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

    function config($routeProvider, $locationProvider, $httpProvider) {

        $routeProvider
            .when('/home/login', {
                controller: 'loginController',
                templateUrl: 'Views/Home/login.cshtml'
            })

            .when('/home/index', {
                controller: 'indexController',
                templateUrl: 'Views/Home/Index.cshtml'
            })
             
            .when('/home/bancos', {
                controller: 'bancosController',
                templateUrl: 'Views/Home/bancos.cshtml'
            })

            .when('#', {
                controller: 'indexController',
                templateUrl: 'Views/Home/index.cshtml'
            })

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

    run.$inject = ['$rootScope', '$location', '$http'];

    function run($rootScope, $location, $http) {
        $rootScope.AppTitle = "Zapaterias El Reventón ERP 1.0.0.0";
        $rootScope.CurrentUser = {
            userName: 'Administrador',
            user_cve: 'admin',
            password: 'admin'
        };

        $rootScope.version = '1.0.0.0'

        // Local
        $rootScope.URLApis = 'http://localhost:50431/api/';
        $rootScope.ClientId = 'reventonERPApp';
    }
})();