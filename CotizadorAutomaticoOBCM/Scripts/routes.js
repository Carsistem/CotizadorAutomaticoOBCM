app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        //LOGIN
        .state('login', {
            url: '/login/:lastAction',
            views: {
                '': {
                    templateUrl: 'Pages/Login/Login.html',
                    controller: 'loginCtrl'
                }
            }
        })
        //INICIO
        .state('app', {
            abstract: true,
            url: '',
            views: {
                '': {
                    templateUrl: 'Pages/Index/main.html',
                }
            }

        })
        //Dashboard
    	.state('app.dashboard', {
    	    url: '/',
    	    views: {
    	        'main': {
    	            templateUrl: 'Pages/Index/dashboard.html',
    	            controller: 'dashboardCtrl'
    	        }
    	    }
    	})

        //DashboardTR
    	.state('app.dashboardTR', {
    	    url: '/dashboardTR',
    	    views: {
    	        'main': {
    	            templateUrl: 'Pages/Index/dashboardTR.html',
    	            controller: 'dashboardTRCtrl'
    	        }
    	    }
    	})

        //Cotizador
        .state('app.Cotizador', {
            url: '/Eventos/Sistema_de_Cambios/Cotizador',
            views: {
                'main': {
                    templateUrl: 'Pages/Eventos/Sistema_de_Cambios/Cotizador.html',
                    controller: 'CotizadorCtrl',
                }
            }
        })

        //resultadosACCC
        .state('app.resultadosACC', {
            url: '/Informes/ForeingExchange/resultadosACC',
            views: {
                'main': {
                    templateUrl: 'Pages/Informes/ForeingExchange/resultadosACC.html',
                    controller: 'resultadosACCCtrl',
                }
            }
        })
        //ContabilidadFX
        .state('app.contabilidadFX', {
            url: '/Informes/ContabilidadFX/ContabilidadFX',
            views: {
                'main': {
                    templateUrl: 'Pages/Informes/ContabilidadFX/ContabilidadFX.html',
                    controller: 'ContabilidadFXCtrl',
                }
            }
        })
        //Feriados
        .state('app.Feriados', {
            url: '/Archivos/Feriados',
            views: {
                'main': {
                    templateUrl: 'Pages/Archivos/Feriados/Feriados.html',
                    controller: 'FeriadosCtrl',
                }
            }
        })

        //$urlMatcherFactoryProvider.strictMode(false);
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});

});