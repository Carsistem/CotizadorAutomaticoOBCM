app.controller('CotizadorCtrl', ['$scope', 'NgTableParams', 'ngDialog',
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

    $scope.Clientes = [{ Codigo: 1, Descripcion: 'Corporate' }, { Codigo: 2, Descripcion: 'PyME' }, { Codigo: 3, Descripcion: 'UGE' }, { Codigo: 4, Descripcion: 'Institucional' }];
    $scope.Clientes.unshift({ Descripcion: '[TODOS]', Codigo: '' });

    $scope.TipoOperaciones = [{ Codigo: 1, Descripcion: 'Compra' }, { Codigo: 2, Descripcion: 'Venta' }];
    $scope.TipoOperaciones.unshift({ Descripcion: '[TODOS]', Codigo: '' });

    $scope.Cierre = [{ Codigo: 1, Descripcion: 'Client' }, { Codigo: 2, Descripcion: 'Corre' },
                        { Codigo: 3, Descripcion: 'Directo' }, { Codigo: 4, Descripcion: '3608 y Oficial' },
                        { Codigo: 5, Descripcion: 'FiDelmpo' }];
    $scope.Cierre.unshift({ Descripcion: '[TODOS]', Codigo: '' });

    $scope.Especies = [{ Codigo: 1, Descripcion: 'USD' }, { Codigo: 2, Descripcion: 'EUR' }, { Codigo: 3, Descripcion: 'Otras' }];
    $scope.Especies.unshift({ Descripcion: '[TODOS]', Codigo: '' });


    $scope.CotizEspecie = [{ Codigo: 1, Descripcion: 'SI' }, { Codigo: 2, Descripcion: 'NO' }];
    $scope.CotizEspecie.unshift({ Descripcion: '[TODOS]', Codigo: '' });




    //Se encarga de buscar las cotizaciones.
    $scope.buscarCotizaciones = function () {

        //Desactivo el checked al recargar la pantalla.
        $scope.checkedAll = false;

        //Actualizo el horario de la ultima consulta.
        $scope.ultimaConsulta = new Date();

        //Cargamos
        $scope.cotizaciones = [{
            Selected: false, Concepto: 'A14', Operacion: 'P1522710', TipoOp: 'Compra', Especie: 'USD', Cliente: 'SCTA2', Monto: 5.000, FechaOp: new Date('02/02/2016'), Cierre: 'Directo', Puesto: true, Plazo: 'Hoy', FechaLiq: new Date('11/15/2017'), FechaLiqExt: new Date('02/22/2017')
        },
            { Selected: false, Concepto: 'A15', Operacion: 'P1532785', TipoOp: 'Compra', Especie: 'EUR', Cliente: 'RIO', Monto: 1700000, FechaOp: new Date('02/22/2016'), Cierre: 'Directo', Puesto: true, Plazo: 'Hoy', FechaLiq: new Date('11/15/2017'), FechaLiqExt: new Date('11/15/2017') },
            { Selected: false, Concepto: 'A16', Operacion: 'P1522710', TipoOp: 'Compra', Especie: 'USD', Cliente: 'RIO4', Monto: 5230, FechaOp: new Date('03/07/2016'), Cierre: 'Directo', Puesto: false, Plazo: 'Hoy', FechaLiq: new Date('11/15/2017'), FechaLiqExt: new Date('11/15/2017') },
            { Selected: false, Concepto: 'A17', Operacion: 'P1522710', TipoOp: 'Venta', Especie: 'EUR', Cliente: 'SCTA2', Monto: 5000, FechaOp: new Date('05/05/2017'), Cierre: 'Directo', Puesto: true, Plazo: 'Hoy', FechaLiq: new Date('11/15/2017'), FechaLiqExt: new Date('11/15/2017') },
            { Selected: false, Concepto: 'A18', Operacion: 'P1536710', TipoOp: 'Venta', Especie: 'USD', Cliente: 'RIO5', Monto: 29440, FechaOp: new Date('07/15/2017'), Cierre: 'Directo', Puesto: false, Plazo: 'Hoy', FechaLiq: new Date('11/15/2017'), FechaLiqExt: new Date('11/15/2017') },
            { Selected: false, Concepto: 'A19', Operacion: 'P1346610', TipoOp: 'Venta', Especie: 'EUR', Cliente: 'SCTA2', Monto: 4000, FechaOp: new Date('03/02/2017'), Cierre: 'Directo', Puesto: true, Plazo: 'Hoy', FechaLiq: new Date('11/15/2017'), FechaLiqExt: new Date('11/15/2017') },
            { Selected: false, Concepto: 'A20', Operacion: 'P1523460', TipoOp: 'Venta', Especie: 'USD', Cliente: 'SCTA2', Monto: 7460, FechaOp: new Date('04/17/2017'), Cierre: 'Directo', Puesto: false, Plazo: 'Hoy', FechaLiq: new Date('11/15/2017'), FechaLiqExt: new Date('11/15/2017') }];
        $scope.tableParams = new NgTableParams({}, { dataset: $scope.cotizaciones });


        ngDialog.close();
    }


    $scope.cargarCotizacionesSeleccionadas = function () {
        //funcion que carga la grilla del cotizador.
        $scope.cotizacionesSeleccionadas = [
        { TipoOp: 'Compra', Especie: 'EUR',MontoTotal:2574723800 ,PrecioMostrador: 0, PrecioInterno: 0 }
            //, { TipoOp: 'Venta', Especie: 'EUR',MontoTotal:126763500, PrecioMostrador: 0, PrecioInterno: 0 }
            //, { TipoOp: 'Compra', Especie: 'USD',MontoTotal:56136500, PrecioMostrador: 0, PrecioInterno: 0 }
            , { TipoOp: 'Venta', Especie: 'USD',MontoTotal:25314600, PrecioMostrador: 0, PrecioInterno: 0 }];

        $scope.tableCotizador = new NgTableParams({ count: $scope.cotizacionesSeleccionadas.length }, { counts: [], dataset: $scope.cotizacionesSeleccionadas });
    }


    $scope.cargarOperacionesPuestoPlazoSeleccionadas = function () {
         $scope.plazos = [{ Codigo: 1, Descripcion: 'Hoy' }, { Codigo: 2, Descripcion: 'Normal' }
                    , { Codigo: 2, Descripcion: '48hs' }];

        //funcion que carga la grilla del cotizador.
        $scope.OperacionesPuestoPlazoSeleccionadas = [
        { TipoOp: 'Compra', Especie: 'EUR', Puesto: true, plazos: {}, FechaLiq: new Date('11/15/2017'), FechaLiqExt: new Date('10/16/2017') }
            , { TipoOp: 'Compra', Especie: 'USD', Puesto: true, plazos: {}, FechaLiq: new Date('09/15/2017'), FechaLiqExt: new Date('09/15/2017') }
            , { TipoOp: 'Venta', Especie: 'USD', Puesto: true, plazos: {}, FechaLiq: new Date('11/23/2017'), FechaLiqExt: new Date('10/12/2017') }
            //, { TipoOp: 'Venta', Especie: 'EUR', Puesto: true, plazos: {}, FechaLiq: new Date('03/15/2017'), FechaLiqExt: new Date('11/15/2017') }
            //, { TipoOp: 'Venta', Especie: 'USD', Puesto: true, plazos: {}, FechaLiq: new Date('10/19/2017'), FechaLiqExt: new Date('10/05/2017') }
            //, { TipoOp: 'Compra', Especie: 'EUR', Puesto: true, plazos: {}, FechaLiq: new Date('10/05/2017'), FechaLiqExt: new Date('11/08/2017') }
        ];

        $scope.tableCambiarPuestoPlazo = new NgTableParams({ count: $scope.OperacionesPuestoPlazoSeleccionadas.length }, { counts: [], dataset: $scope.OperacionesPuestoPlazoSeleccionadas });
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

    }

    //Funcion que oculta/muestra el cotizador.
    $scope.cotizador = function () {
        ngDialog.open({
            template: 'cotizador',
            className: 'ngdialog-theme-default',
            showClose: false,
            scope: $scope,
            width: '730px'

        });

        //Cargo las cotizaciones seleccionadas.
        $scope.cargarCotizacionesSeleccionadas();
    }

    //Funcion que oculta/muestra el Popup Cambiar Puesto/Plazo.
    $scope.cambiarPuestoPlazo = function () {
        ngDialog.open({
            template: 'cambiarPuestoPlazo',
            className: 'ngdialog-theme-default',
            showClose: false,
            scope: $scope,
            width: '730px'

        });

        //Cargo las cotizaciones seleccionadas.
        $scope.cargarOperacionesPuestoPlazoSeleccionadas();
    }

    //funcion que oculta/muestra los filtros de la grilla
    $scope.filtrosGrilla = function () {

        if ($scope.hideBasicFilters == true) {
            $scope.hideBasicFilters = false;
        } else {
            $scope.hideBasicFilters = true;
        }

    }

    //Oculta los controles en base al codigo seleccionado.
    $scope.selectedCierre = function () {
        console.log($scope.filterCotizacion.Cierre);
        //Hace referencia al cogido Cierre.
        if ($scope.filterCotizacion.Cierre == 3) {
            $scope.hideRowDirect = true;
        } else {
            $scope.hideRowDirect = false;
        }
    }

    //Funcion que selecciona los item de la grilla.
    $scope.selectedRow = function (concepto) {
        $scope.checkedAll = true;
        angular.forEach($scope.cotizaciones, function (valor, index) {
            if (valor.Concepto == concepto) {
                if (valor.Selected) {
                    valor.Selected = false;
                } else {
                    valor.Selected = true;
                }
            }

            if (!valor.Selected) {
                $scope.checkedAll = false;
            }
        })

    }

    $scope.selectedAllRow = function () {
        angular.forEach($scope.cotizaciones, function (valor, index) {
            if ($scope.checkedAll) {
                valor.Selected = true;
            } else {
                valor.Selected = false;
            }
        })
    }

    $scope.setClassName = function (seleccionado,tipoOp) {
        var className = '';

        if (tipoOp == 'Compra') {
            className = 'rowOperacionCompra';
        } else {
            className = 'rowOperacionVenta';
        }
        
        if (seleccionado)
            className = 'selectedGrilla';

        return className;
    };

}]);