(function () {
    'use strict';

    angular
        .module('reventonERPApp')
        .factory('operationsFactory', operationsFactory);

    operationsFactory.$inject = ['$http', '$q', '$rootScope', '$sessionStorage', '$window', '$log'];

    function operationsFactory($http, $q, $rootScope, $sessionStorage, $window, $log) {
        return {
            registrarreporte: function (factura, fechaFactura, noCheque, fechaPago, proveedor, t0, excentos, compras, gastos, ivaCompras, ivaGastos, retensionISR, retensionIVA, total, usuario) {
                var temp = {};
                var defer = $q.defer();
                var apiUrlRegistrarReporteBancos = $rootScope.URLApis + 'Operations/registrarreporte';

                var reporteBancoModel = {
                    factura: factura,
                    fechaFactura: fechaFactura,
                    noCheque: noCheque,
                    fechaPago: fechaPago,
                    proveedor: proveedor,
                    t0: t0,
                    excentos: excentos,
                    compras: compras,
                    gastos: gastos,
                    ivaCompras: ivaCompras,
                    ivaGastos: ivaGastos,
                    retensionISR: retensionISR,
                    retensionIVA: retensionIVA,
                    total: total,
                    fechaAlta: new Date(),
                    idUsuarioAlta: usuario,
                    estatus : 1
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlRegistrarReporteBancos, reporteBancoModel, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (data, status, headers, config) {
                    var error = { 'data': data, 'status': status, 'headers': headers, 'config': config };
                    defer.reject(error);
                });

                return defer.promise;
            },
            obtenerBancos: function () {
                var temp = {};
                var defer = $q.defer();
                var apiUrlBancos = $rootScope.URLApis + 'Operations/obtenerbancos';

                $http.get(apiUrlBancos).then(function (response) {
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