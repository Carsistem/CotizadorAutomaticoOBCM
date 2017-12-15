app.factory('authService', ['$http', '$q', '$rootScope', '$location', '$state', 'localStorageService',
function ($http, $q, $rootScope, $location, $state, localStorageService) {

    var self =
    {
        authData: {},
        logIn: function (loginData){
                            
            var d = $q.defer();

            localStorageService.set("authData", { Usuario: loginData.Usuario });

            authData = localStorageService.get("authData");

            d.resolve(authData);

            return d.promise;

        },
        logOut: function () {

            var d = $q.defer();

            localStorageService.clearAll();

            authData = {};

            d.resolve(authData);

            return d.promise;

        },
        isLogedIn: function () {

            var datosUsuario = localStorageService.get("authData");

            if(datosUsuario === null)
            {
                $state.go('login', { lastAction: 'notLoggedIn' });
            }

        },
        readLocal: function () {
            authData = localStorageService.get("authData");
        },
        getData: function () {
            self.readLocal;
            return authData;
        }
    }

    return self;
}]);