app.controller('ContabilidadFXCtrl', ['$scope', 'NgTableParams', 'ngDialog',
function ($scope, NgTableParams, ngDialog) {

    var vm = this;
    //declaración de variables

    $scope.filterCotizacion = {};
    $scope.hideBasicFilters = false;
    $scope.hideRowDirect = false;
    $scope.checkedAll = false;
    $scope.ultimaConsulta = new Date();

    //carga de la pagina
    this.$onInit = Load;
    function Load() {
        $scope.filtrosAvanzados();
    };

    $scope.Mercados = [{ Codigo: 1, Descripcion: 'Oficial' }, { Codigo: 2, Descripcion: 'Libre' }, { Codigo: 3, Descripcion: '3608' }, { Codigo: 4, Descripcion: '3619' }, { Codigo: 5, Descripcion: 'Conv' }];
    $scope.FiltroFecha = '';

    $scope.seleccionFiltros = { Mercado: { valor: '3' }, Fecha: { valor: '' }}
    
    //Se encarga de buscar las cotizaciones.
    $scope.buscarResultadoOperacionesACC = function () {

        //Desactivo el checked al recargar la pantalla.
        $scope.checkedAll = false;

        //Actualizo el horario de la ultima consulta.
        $scope.ultimaConsulta = new Date();

        //Cargamos
        $scope.DatosGrilla = [{
            Especie: '1-GBP', PosIniContado: 122531.32, PosIniFuturo: 0, MovDiaContado: 0, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: 122531.32, PosFinFuturo: 0, PosFinTotal: 0, PrecioInv: ''
        },
        {
            Especie: '2-USB', PosIniContado: -6934496907.09, PosIniFuturo: 0, MovDiaContado: -1119624.24, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: -6935616531.33, PosFinFuturo: 0, PosFinTotal: -6935616531.33, PrecioInv: ''
        },
        {
            Especie: '2-USB (T)', PosIniContado: 0, PosIniFuturo: 0, MovDiaContado: -60453.43, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: -60453.43, PosFinFuturo: 0, PosFinTotal: -60453.43, PrecioInv: ''
        },
        {
            Especie: '2-USD', PosIniContado: 3423233056.67, PosIniFuturo: -28200000, MovDiaContado: -1592167.11, MovDiaFuturoConc: -2000000,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: 3421640889.56, PosFinFuturo: -30200000, PosFinTotal: 3391440889.56, PrecioInv: ''
        },
        {
            Especie: '2-USD (T)', PosIniContado: 0, PosIniFuturo: 0, MovDiaContado: 68345, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: 68345, PosFinFuturo: 0, PosFinTotal: 68345, PrecioInv: ''
        },
        {
            Especie: '5-CHF', PosIniContado: 518716.10, PosIniFuturo: 0, MovDiaContado: 0, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: 518716.10, PosFinFuturo: 0, PosFinTotal: 518716.10, PrecioInv: ''
        },
        {
            Especie: '15-DKK', PosIniContado: 1502693.22, PosIniFuturo: 0, MovDiaContado: 0, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: 1502693.22, PosFinFuturo: 0, PosFinTotal: 1502693.22, PrecioInv: ''
        },
        {
            Especie: '17-CAD', PosIniContado: -1856359.43, PosIniFuturo: 0, MovDiaContado: 0, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: -1856359.43, PosFinFuturo: 0, PosFinTotal: -1856359.43, PrecioInv: ''
        },
        {
            Especie: '19-JPY', PosIniContado: 110184050.17, PosIniFuturo: 0, MovDiaContado: 0, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: 110184050.17, PosFinFuturo: 0, PosFinTotal: 110184050.17, PrecioInv: ''
        },
        {
            Especie: '27-SEK', PosIniContado: 1272711.45, PosIniFuturo: 0, MovDiaContado: 0, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: 1272711.45, PosFinFuturo: 0, PosFinTotal: 1272711.45, PrecioInv: ''
        },
        {
            Especie: '28-NOK', PosIniContado: 534072.98, PosIniFuturo: 0, MovDiaContado: 0, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: 534072.98, PosFinFuturo: 0, PosFinTotal: 534072.98, PrecioInv: ''
        },
        {
            Especie: '98-EUB', PosIniContado: 3928596.09, PosIniFuturo: 0, MovDiaContado: -2350, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: 3926246.09, PosFinFuturo: 0, PosFinTotal: 3926246.09, PrecioInv: ''
        },
        {
            Especie: '98-EUR', PosIniContado: -60757061.74, PosIniFuturo: 0, MovDiaContado: -14448.53, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: -60771510.27, PosFinFuturo: 0, PosFinTotal: -60771510.27, PrecioInv: ''
        },
        {
            Especie: '98-EUR (T)', PosIniContado: 0, PosIniFuturo: 0, MovDiaContado: -7164, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: '', PosFinContado: -7164, PosFinFuturo: 0, PosFinTotal: -7164, PrecioInv: ''
        },
        {

        },
        {

        },
        {
            Especie: 'SubTT - 2', PosIniContado: -3511263850.42, PosIniFuturo: -28200000, MovDiaContado: -2711791.35, MovDiaFuturoConc: -2000000,
            MovDiaFuturoVenc: 0, MovDiaTransform: 0, PosFinContado: -3513975641.77, PosFinFuturo: -30200000, PosFinTotal: -3544175641.77, PrecioInv: ''
        },
        {
            Especie: 'SubTT - 4', PosIniContado: 0, PosIniFuturo: 0, MovDiaContado: 7891.51, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: 0, PosFinContado: 7891.57, PosFinFuturo: 0, PosFinTotal: 7891.57, PrecioInv: ''
        },
        {
            Especie: 'SubTT - 5', PosIniContado: 0, PosIniFuturo: 0, MovDiaContado: 0, MovDiaFuturoConc: 0,
            MovDiaFuturoVenc: 0, MovDiaTransform: 0, PosFinContado: 0, PosFinFuturo: 0, PosFinTotal: 0, PrecioInv: ''
        }
        ];

        $scope.tableParams = new NgTableParams({ count: 25 }, { dataset: $scope.DatosGrilla });


        ngDialog.close();
    }



    //funcion que oculta/muestra los filtros para refinar la busqueda
    $scope.filtrosAvanzados = function () {

        ngDialog.open({
            template: 'filters',
            className: 'ngdialog-theme-default',
            showClose: false,
            scope: $scope,
            width: '730px'
        });
        console.log($scope.seleccionFiltros);
    }

    //funcion que oculta/muestra los filtros de la grilla
    $scope.filtrosGrilla = function () {

        if ($scope.hideBasicFilters == true) {
            $scope.hideBasicFilters = false;
        } else {
            $scope.hideBasicFilters = true;
        }

    }

}]);