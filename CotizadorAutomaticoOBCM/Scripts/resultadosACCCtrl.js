app.controller('resultadosACCCtrl', ['$scope', 'NgTableParams', 'ngDialog',
function ($scope, NgTableParams, ngDialog) {

    var vm = this;
    //declaración de variables

    $scope.filterResultadosACC = {};
    $scope.hideBasicFilters = false;
    $scope.hideRowDirect = false;
    $scope.ultimaConsulta = new Date();

    //Declaracion de variables para filtros.
    $scope.MostrarEspeciales = false;
    $scope.MostrarAgrupar = true;
    $scope.hideFiltroPrecios = true;
    $scope.MostrarFormatoDetalle = false;
    $scope.FiltroFechaDesde = '';
    $scope.FiltroFechaHasta = '';

    //carga de la pagina
    this.$onInit = Load;

    function Load() {
        $scope.filtrosAvanzados();
        //$('select').select2();
        //$('ul').tree();
    };

    $scope.Mostrar = [{ Codigo: 1, Descripcion: 'Empleados' }, { Codigo: 2, Descripcion: 'Especiales' }];
    $scope.Mostrar.unshift({ Descripcion: 'Todas', Codigo: '' });

    $scope.Moneda = [{ Codigo: 1, Descripcion: 'USD' }, { Codigo: 2, Descripcion: 'EUB' }];

    $scope.Formato = [{ Codigo: 1, Descripcion: 'Totales' }, { Codigo: 2, Descripcion: 'Detalle' }];
                    

    $scope.TipoOp = [{ Codigo: 1, Descripcion: 'Todas' }, { Codigo: 2, Descripcion: 'Compra' },
                    { Codigo: 3, Descripcion: 'Venta' }];


    $scope.Boletos = [{ Codigo: 1, Descripcion: 'Comunes' }, { Codigo: 2, Descripcion: 'Amparos' },
                       {Codigo:3,Descripcion:'Total'}];

    $scope.Agrupar = [{ Codigo: 1, Descripcion: 'Usuario Ingreso' }, { Codigo: 2, Descripcion: 'Canal' }];

    $scope.Estados = [{ Codigo: 1, Descripcion: 'Autorizada' }, { Codigo: 2, Descripcion: 'Liqudadas' },
                       { Codigo: 3, Descripcion: 'Todas' }];

    //Se encarga de buscar las cotizaciones.
    $scope.buscarResultadoOperacionesACC = function () {

        //Desactivo el checked al recargar la pantalla.
        $scope.checkedAll = false;

        //Actualizo el horario de la ultima consulta.
        $scope.ultimaConsulta = new Date();

        //Cargamos
        $scope.ResultadoOperacionesACC = [{
            Selected: false, Fecha: new Date('05/15/2017'), Canal: 'MOBILE', Sucursal: 0,
            MonedaExtCompra: 19238.66, PPPIntCompra: 15.510000, PPPMostCompra: 15.505810,
            ResultadoCompra: 80.61, CantOperCompra: 17, MonedaExtVenta: 9690.33, PPPIntVenta: 15.76,
            PPPMostVenta: 15.95, ResultadoVenta: 1841.20, CantOperVenta: 9
        },
        {
            Selected: false, Fecha: new Date('05/15/2017'), Canal: 'MOBILE', Sucursal: 5,
            MonedaExtCompra: 3137.10, PPPIntCompra: 15.510000, PPPMostCompra: 15.505810,
            ResultadoCompra: 18.37, CantOperCompra: 6, MonedaExtVenta: 1287.78, PPPIntVenta: 15.76,
            PPPMostVenta: 15.95, ResultadoVenta: 244.74, CantOperVenta: 7
        },
        {
            Selected: false, Fecha: new Date('05/15/2017'), Canal: 'MOBILE', Sucursal: 6,
            MonedaExtCompra: 0, PPPIntCompra: 0, PPPMostCompra: 0,
            ResultadoCompra: 0, CantOperCompra: 0, MonedaExtVenta: 62.62, PPPIntVenta: 15.76,
            PPPMostVenta: 15.96, ResultadoVenta: 13.11, CantOperVenta: 1
        },
        {
            Selected: false, Fecha: new Date('05/15/2017'), Canal: 'MOBILE', Sucursal: 9,
            MonedaExtCompra: 2000, PPPIntCompra: 15.51, PPPMostCompra: 15.49,
            ResultadoCompra: 25, CantOperCompra: 4, MonedaExtVenta: 2200.47, PPPIntVenta: 15.76,
            PPPMostVenta: 15.96, ResultadoVenta: 462.09, CantOperVenta: 6
        },
        {
            Selected: false, Fecha: new Date('05/15/2017'), Canal: 'MOBILE', Sucursal: 10,
            MonedaExtCompra: 500, PPPIntCompra: 15.51, PPPMostCompra: 15.50,
            ResultadoCompra: 5, CantOperCompra: 1, MonedaExtVenta: 1111.40, PPPIntVenta: 15.76,
            PPPMostVenta: 15.96, ResultadoVenta: 233.34, CantOperVenta: 3
        },
        {
            Selected: false, Fecha: new Date('05/15/2017'), Canal: 'MOBILE', Sucursal: 13,
            MonedaExtCompra: 100, PPPIntCompra: 15.51, PPPMostCompra: 15.49,
            ResultadoCompra: 2, CantOperCompra: 1, MonedaExtVenta: 9000.94, PPPIntVenta: 15.76,
            PPPMostVenta: 15.96, ResultadoVenta: 1890.19, CantOperVenta: 4
        },
        {
            Selected: false, Fecha: new Date('05/15/2017'), Canal: 'MOBILE', Sucursal: 14,
            MonedaExtCompra: 5111, PPPIntCompra: 15.51, PPPMostCompra: 15.50,
            ResultadoCompra: 7.11, CantOperCompra: 7, MonedaExtVenta: 2141.45, PPPIntVenta: 15.76,
            PPPMostVenta: 15.94, ResultadoVenta: 406.99, CantOperVenta: 9
        },
        {
            Selected: false, Fecha: new Date('05/15/2017'), Canal: 'MOBILE', Sucursal: 15,
            MonedaExtCompra: 100, PPPIntCompra: 15.51, PPPMostCompra: 15.50,
            ResultadoCompra: 1, CantOperCompra:1, MonedaExtVenta: 451.57, PPPIntVenta: 15.76,
            PPPMostVenta: 15.94, ResultadoVenta: 85.76, CantOperVenta: 3
        },
        {
            Selected: false, Fecha: new Date('05/15/2017'), Canal: 'MOBILE', Sucursal: 16,
            MonedaExtCompra: 820.16, PPPIntCompra: 15.51, PPPMostCompra: 15.50,
            ResultadoCompra: 6.19, CantOperCompra: 3, MonedaExtVenta: 8641.07, PPPIntVenta: 15.76,
            PPPMostVenta: 15.94, ResultadoVenta: 1641.74, CantOperVenta: 12
        }
        ];

        $scope.tableParams = new NgTableParams({}, { dataset: $scope.ResultadoOperacionesACC });


        ngDialog.close();
    }



    //funcion que oculta/muestra los filtros para refinar la busqueda
    $scope.filtrosAvanzados = function () {

        ngDialog.open({
            template: 'filters',
            className: 'ngdialog-theme-default',
            showClose: false,
            scope: $scope,
            width: '730px',
            trapFocus:false
        });

    }

    //funcion que oculta/muestra los filtros de la grilla
    $scope.filtrosGrilla = function () {

        if ($scope.hideBasicFilters == true) {
            $scope.hideBasicFilters = false;
        } else {
            $scope.hideBasicFilters = true;
        }

    }

    //Oculta los controles especiales o agrupar segun el campo seleccionado en Mostrar.
    $scope.selectedMostrar = function () {
        //Hace referencia al cogido Cierre.
        if ($scope.filterResultadosACC.Mostrar == 2) {
            $scope.MostrarEspeciales = true;
            $scope.MostrarAgrupar = false;
        } else {
            $scope.MostrarEspeciales = false;
            $scope.MostrarAgrupar = true;
        }
    }

    //Oculta los controles especiales o agrupar segun el campo seleccionado en Mostrar.
    $scope.selectedFormato = function () {
        //Hace referencia al cogido Cierre.
        if ($scope.filterResultadosACC.Formato == 1) {
            $scope.MostrarFormatoDetalle = true;
        } else {
            $scope.MostrarFormatoDetalle = false;
        }
    }

}]);