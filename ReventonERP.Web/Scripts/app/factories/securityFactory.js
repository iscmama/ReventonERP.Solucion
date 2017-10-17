(function () {
    'use strict';

    angular
        .module('reventonERPApp')
        .factory('securityFactory', securityFactory);

    securityFactory.$inject = ['$http', '$q', '$rootScope', '$sessionStorage', '$window', '$log'];

    function securityFactory($http, $q, $rootScope, $sessionStorage, $window, $log) {
        return {
            autenticar: function (correo, contrasena) {
                var securityFactory = {};
                var temp = {};
                var defer = $q.defer();
                var apiUrlAutenticar = $rootScope.URLApis + 'Security/autenticar';
                
                var data = "?correo=" + correo + "&contrasena=" + contrasena;

                $http.get(apiUrlAutenticar + data).then(function (response) {
                    defer.resolve(response);
                }).catch(function (data, status, headers, config) {
                    var error = { 'data': data, 'status': status, 'headers': headers, 'config': config };
                    defer.reject(error);
                });

                return defer.promise;
            }
        };
    }
})();