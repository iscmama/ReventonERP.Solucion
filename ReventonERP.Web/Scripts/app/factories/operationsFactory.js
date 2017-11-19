(function () {
    'use strict';

    angular
        .module('reventonERPApp')
        .factory('operationsFactory', operationsFactory);

    operationsFactory.$inject = ['$http', '$q', '$rootScope', '$sessionStorage', '$window', '$log'];

    function operationsFactory($http, $q, $rootScope, $sessionStorage, $window, $log) {
        return {
            registrarreporte: function (factura, fechaFactura, noCheque, fechaPago, proveedor, t0, excentos, compras, gastos, ivaCompras, ivaGastos, retensionISR, retensionIVA, total, usuario, uuid) {
                var temp = {};
                var defer = $q.defer();
                var apiUrlRegistrarReporteBancos = $rootScope.URLApis + 'Operations/registrarreporte';

                var reporteBancoModel = {
                    tipo: 1,
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
                    estatus: 1,
                    uuid: uuid
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
            },
            actualizarBancos: function (idBancos, numero, fechaPagoBanco, proveedor, numeroFactura, fechaFacturaBanco, cargos, usuario, uuid) {
                var temp = {};
                var defer = $q.defer();
                var apiUrlActualizarBancos = $rootScope.URLApis + 'Operations/actualizarbancos';

                $log.info(fechaPagoBanco);
                $log.info(fechaFacturaBanco);

                var bancoModel = {
                    idBancos: idBancos,
                    tipo: 1,
                    numeroCheque: numero,
                    fechaPago: fechaPagoBanco,
                    proveedor: proveedor,
                    numeroFactura: numeroFactura,
                    fechaFactura: fechaFacturaBanco,
                    cargos: cargos,
                    idUsuarioModificacion: usuario,
                    fechaModificacion: new Date(),
                    uuid: uuid
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlActualizarBancos, bancoModel, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (data, status, headers, config) {
                    var error = { 'data': data, 'status': status, 'headers': headers, 'config': config };
                    defer.reject(error);
                });

                return defer.promise;
            },
            registrardeposito: function (idBancos, referenciaDepositos, fechaPago, proveedor, depositos, usuario) {
                var temp = {};
                var defer = $q.defer();
                var apiUrlRegistrarDepositos = $rootScope.URLApis + 'Operations/registrardeposito';

                var reporteBancoModel = {
                    idBancos: idBancos,
                    tipo: 2,
                    referenciaDepositos: referenciaDepositos,
                    fechaPago: fechaPago,
                    proveedor: proveedor,
                    depositos: depositos,
                    idUsuarioAlta: usuario,
                    idUsuarioModificacion: usuario,
                    estatus: 1
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlRegistrarDepositos, reporteBancoModel, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (data, status, headers, config) {
                    var error = { 'data': data, 'status': status, 'headers': headers, 'config': config };
                    defer.reject(error);
                });

                return defer.promise;

            },
            busqueda: function (numeroCheque, proveedor, numeroFactura, referenciaDepositos, opcionFechaPago, opcionFechaFactura) {
                var temp = {};
                var defer = $q.defer();
                var apiUrlBusqueda = $rootScope.URLApis + 'Operations/busqueda';

                var busquedaModel = {
                    numeroCheque: numeroCheque,
                    proveedor: proveedor,
                    numeroFactura: numeroFactura,
                    referenciaDepositos: referenciaDepositos,
                    opcionFechaPago: opcionFechaPago,
                    opcionFechaFactura: opcionFechaFactura
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlBusqueda, busquedaModel, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (data, status, headers, config) {
                    var error = { 'data': data, 'status': status, 'headers': headers, 'config': config };
                    defer.reject(error);
                });

                return defer.promise;
            },
            actualizarFechas: function (ids, fechaPago, usuario) {
                var temp = {};
                var defer = $q.defer();
                var apiUrlActualizarFechas = $rootScope.URLApis + 'Operations/actualizarFechas';

                var actualizarFechasModel = {
                    ids: ids,
                    fechaPago: fechaPago,
                    usuario: usuario
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlActualizarFechas, actualizarFechasModel, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (data, status, headers, config) {
                    var error = { 'data': data, 'status': status, 'headers': headers, 'config': config };
                    defer.reject(error);
                });

                return defer.promise;
            },
            eliminarbanco: function (idBancos, usuario) {
                var temp = {};
                var defer = $q.defer();
                var apiUrlEliminarBanco = $rootScope.URLApis + 'Operations/eliminarbanco';

                var eliminarBancoModel = {
                    idBancos: idBancos,
                    usuario: usuario
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlEliminarBanco, eliminarBancoModel, config).then(function (response) {
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