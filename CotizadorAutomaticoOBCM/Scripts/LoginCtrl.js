app.controller('loginCtrl', ['$scope', '$location', 'authService', 'Flash', '$state'
, function ($scope, $location, authService, Flash, $state) {

    $scope.loginData = {
        Usuario: "",
        Password: "",
    };

    angular.element(function () {

        getParams();

    });

    $scope.login = function () {

        return authService.logIn($scope.loginData).then(function (response) {

            $state.go('app.dashboard');

        }).catch(function (err) {

            if (err.status == "404") {
                message('danger', '¡Usuario / Contraseña invalidos!');
            } else {
                message('danger', err.data);
            }

        });

    }

    /*Declaración de funciones privadas*/

    function message(type, message) {
        Flash.create(type, message, 10000, { container: 'login' });
    };

    function getParams() {

        if ($state.params.lastAction == 'notLoggedIn') {
            message("warning", "<i class='fa fa-bell-o'></i> Debes iniciar sesión para acceder a la aplicación");
        }

        if ($state.params.lastAction == 'logout') {
            message("success", "<i class='fa fa-bell-o'></i> Debes iniciar sesión para acceder a la aplicación");
        }
        if ($state.params.lastAction == 'notAuthorized') {
            message("warning", "<i class='fa fa-bell-o'></i> Las credenciales han expirado");
        }

    }

}]);