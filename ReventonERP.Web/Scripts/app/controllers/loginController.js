(function () {
    'use strict';

    angular
        .module('reventonERPApp')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', 'securityFactory', '$log', '$window', '$sessionStorage', '$q'];

    function loginController($scope, securityFactory, $log, $window, $sessionStorage, $q) {
        var full = $q.defer();
        loadDataPage();

        function loadDataPage() {
            $scope.LoginModel = {
                'correo': '',
                'contrasena': ''
            }
            $scope.RecoveryModel = {
                'correoRecuperar': ''
            }
        }
        $scope.login = function () {

            var correo = jQuery('#correo').val();
            var contrasena = jQuery('#contrasena').val();

            if (correo == '' && contrasena == '') {
                alert("Usuario o contraseña no válidos");
                full.resolve();
                return false;
            }

            if ($scope.loginForm.$invalid) {
                alert("Información Inválida");
                full.resolve();
                return false;
            }

            $scope.process = true;
            $scope.isDisabled = true;

            securityFactory.autenticar($scope.LoginModel.correo, $scope.LoginModel.contrasena)
                .then(function (data) {
                    $log.info(data.data);
                    $sessionStorage.authorizationData = JSON.parse(data.data);
                    $scope.completed = true;
                })
                .catch(function (error) {

                    $log.error(error);

                    if (error.data.status == 500) {
                        $scope.process = false;
                        $scope.isDisabled = false;
                        $scope.LoginModel.contrasena = '';
                        alert(error.data.data.ExceptionMessage);
                    }

                    full.resolve();
                });
        }
        $scope.recuperarContrasena = function () {
            alert('Su contraseña fue enviada al correo proporcionado');
            $window.location.href = '/home/login';
        }
        $scope.$watch('completed', function () {
            if ($scope.completed) {
                $scope.process = false;
                $scope.isDisabled = false;
                $window.location.href = '/home/index';
            }
        });
    }
})();