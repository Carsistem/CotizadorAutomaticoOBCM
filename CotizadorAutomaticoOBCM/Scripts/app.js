var app;


(function () {
    app = angular.module('FpaApp', [
           'FBAngular',
           'ui.router',
           'chart.js',
           'LocalStorageModule',
           'ngFlash',
           'ngTable',
           'ngDialog'
    ]);
})();

app.run(function (authService) {
    authService.readLocal();

    console.log("iniciando angular (run)");
});


app.run(function ($transitions) {
    $transitions.onStart({ to: 'app.**'}, function (trans) {


        var auth = trans.injector().get('authService');
        auth.isLogedIn();

        $.AdminLTE.activate();
        $('ul').tree();
        $('div').boxWidget();
    });
});

// ======================================================
//	Main Controller
// ======================================================

app.controller('mainCtrl', ['$scope', 'Fullscreen', 'authService', '$state', 'ngDialog', 'datetimepicker',
function ($scope, Fullscreen, authService, $state) {



 locales = {
    fr: {
      "DATETIME_FORMATS": {
        "AMPMS": [
          "AM",
          "PM"
        ],
        "DAY": [
          "dimanche",
          "lundi",
          "mardi",
          "mercredi",
          "jeudi",
          "vendredi",
          "samedi"
        ],
        "MONTH": [
          "janvier",
          "f\u00e9vrier",
          "mars",
          "avril",
          "mai",
          "juin",
          "juillet",
          "ao\u00fbt",
          "septembre",
          "octobre",
          "novembre",
          "d\u00e9cembre"
        ],
        "SHORTDAY": [
          "dim.",
          "lun.",
          "mar.",
          "mer.",
          "jeu.",
          "ven.",
          "sam."
        ],
        "SHORTMONTH": [
          "janv.",
          "f\u00e9vr.",
          "mars",
          "avr.",
          "mai",
          "juin",
          "juil.",
          "ao\u00fbt",
          "sept.",
          "oct.",
          "nov.",
          "d\u00e9c."
        ],
        "fullDate": "EEEE d MMMM y",
        "longDate": "d MMMM y",
        "medium": "d MMM y HH:mm:ss",
        "mediumDate": "d MMM y",
        "mediumTime": "HH:mm:ss",
        "short": "dd/MM/yy HH:mm",
        "shortDate": "dd/MM/yy",
        "shortTime": "HH:mm"
      },
      "NUMBER_FORMATS": {
        "CURRENCY_SYM": "\u20ac",
        "DECIMAL_SEP": ",",
        "GROUP_SEP": "\u00a0",
        "PATTERNS": [
          {
            "gSize": 3,
            "lgSize": 3,
            "macFrac": 0,
            "maxFrac": 3,
            "minFrac": 0,
            "minInt": 1,
            "negPre": "-",
            "negSuf": "",
            "posPre": "",
            "posSuf": ""
          },
          {
            "gSize": 3,
            "lgSize": 3,
            "macFrac": 0,
            "maxFrac": 2,
            "minFrac": 2,
            "minInt": 1,
            "negPre": "(",
            "negSuf": "\u00a0\u00a4)",
            "posPre": "",
            "posSuf": "\u00a0\u00a4"
          }
        ]
      },
      "id": "fr-fr",
      "pluralCat": function (n) {
        if (n >= 0 && n <= 2 && n != 2) {
          return PLURAL_CATEGORY.ONE;
        }
        return PLURAL_CATEGORY.OTHER;
      }
    },
    en: {
      "DATETIME_FORMATS": {
        "AMPMS": [
          "AM",
          "PM"
        ],
        "DAY": [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "MONTH": [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        "SHORTDAY": [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat"
        ],
        "SHORTMONTH": [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        "fullDate": "EEEE, MMMM d, y",
        "longDate": "MMMM d, y",
        "medium": "MMM d, y h:mm:ss a",
        "mediumDate": "MMM d, y",
        "mediumTime": "h:mm:ss a",
        "short": "M/d/yy h:mm a",
        "shortDate": "M/d/yy",
        "shortTime": "h:mm a"
      },
      "NUMBER_FORMATS": {
        "CURRENCY_SYM": "$",
        "DECIMAL_SEP": ".",
        "GROUP_SEP": ",",
        "PATTERNS": [
          {
            "gSize": 3,
            "lgSize": 3,
            "macFrac": 0,
            "maxFrac": 3,
            "minFrac": 0,
            "minInt": 1,
            "negPre": "-",
            "negSuf": "",
            "posPre": "",
            "posSuf": ""
          },
          {
            "gSize": 3,
            "lgSize": 3,
            "macFrac": 0,
            "maxFrac": 2,
            "minFrac": 2,
            "minInt": 1,
            "negPre": "(\u00a4",
            "negSuf": ")",
            "posPre": "\u00a4",
            "posSuf": ""
          }
        ]
      },
      "id": "en-us",
      "pluralCat": function (n) {
        if (n == 1) {
          return PLURAL_CATEGORY.ONE;
        }
        return PLURAL_CATEGORY.OTHER;
      }
    }};

/***************************************************************************/









    this.$onInit = Load;

    function Load() {
        $.AdminLTE.activate();
        $('ul').tree();
    };

    //Declaracion de variables

    $scope.config = {
        "version": "1.0.0",
        "aplicativo": "",
        "iniciales": "SAM",
        "anio": "2017",
        "web": "http://intranet.ar.bsch/",
        "empresa": "Banco Santander Rio"
    };

    //$scope.userName = authService.getData().Usuario;

    //Funciones globales

    $scope.logOff = function () {
        authService.logOut().then(function (response) {
            $state.go('login', { lastAction: 'logout' });
        }).catch(function (err) {

            console.log("Ha ocurrido un error al cerrar sesión: " + err)

        });
    }

    $scope.goFullscreen = function () {

        if (Fullscreen.isEnabled())
            Fullscreen.cancel();
        else
            Fullscreen.all();
    }

    $scope.setLang = function (lang) {
        // changes $locale
        angular.copy(locales[lang], $locale);
        // changes dt to apply the $locale changes
        $scope.dt=new Date($scope.dt.getTime());
    };

}]);

var FpaApp = angular.module("FpaApp", ['ngDialog']);
//var FpaApp = angular.module("FpaApp", ['datetimepicker'])
//FpaApp.config([
//					'datetimepickerProvider',
//					function (datetimepickerProvider) {
//						datetimepickerProvider.setOptions({
//							locale: 'en'
//						});
//					}
//				]);

FpaApp.controller("mainCtrl", function($scope, ngDialog) {


$scope.BuscarSegmentos = function () {

    ngDialog.open({
        template: 'BuscarSegmentos',
        className: 'ngdialog-theme-default',
        showClose: false,
        scope: $scope,
        width: '530px'
    });
    //console.log($scope.seleccionFiltros);
}



$scope.PopupParametros = function () {

    ngDialog.open({
        template: 'PopupParametros',
        className: 'ngdialog-theme-default',
        showClose: false,
        scope: $scope,
        width: '430px'
    });
    //console.log($scope.seleccionFiltros);
}

$scope.BuscarClientes = function () {

    ngDialog.open({
        template: 'BuscarClientes',
        className: 'ngdialog-theme-default',
        showClose: false,
        scope: $scope,
        width: '530px'
    });
}

$scope.ClienteFilter = null;

$scope.BuscarMonedas = function () {

    ngDialog.open({
        template: 'BuscarMonedas',
        className: 'ngdialog-theme-default',
        showClose: false,
        scope: $scope,
        width: '530px'
    });
}

$scope.filterCotizacion = {
    SegmentosSeleccionados: [],
    ClientesSeleccionados: [],
    Segmentos: [
        {'Codigo': '0', 'name': '[TODOS]'},
        {'Codigo': '1', 'name': 'EMPRESAS'},
        {'Codigo': '2', 'name': 'PYME 2'},
        {'Codigo': '3', 'name': 'SELECT'},
        {'Codigo': '4', 'name': 'INDIVIDUOS'},
        {'Codigo': '5', 'name': 'GRANDES EMPRESAS'}
    ],
    Clientes: [
        {'Codigo': '0', name: '[TODOS]'},
        {'Codigo': '1', name: 'CLIENTE 1'},
        {'Codigo': '2', name: 'CLIENTE 2'},
        {'Codigo': '3', name: 'CLIENTE 4'},
        {'Codigo': '4', name: 'CLIENTE 8'},
        {'Codigo': '5', name: 'CLIENTE 12'}
    ],
    Logicas: [
        {'Codigo': '0', name: 'MAYOR O IGUAL'},
        {'Codigo': '1', name: 'MENOR'},
    ],
    Monedas: [],
    Solicitudes: [
        {'Codigo': '0', name: 'VENTA'},
        {'Codigo': '1', name: 'COMPRA'},
        {'Codigo': '2', name: 'COTIZACION SIMULTANEA'}
    ]
};





$.ajax({
        data:  null,
        url:   '/TallerExcepcion/getMonedas',
        type:  'post',
        success:  function (response) {
                var monedas = [];
                for(var i=0; i < response.length; i++){
                    monedas[i] = {'Codigo': response[i].IdMoneda, 'name': response[i].Descripcion};
                }
                $scope.filterCotizacion.Monedas = monedas;
                $scope.filterCotizacion.MonedasAll = monedas;
        }
});

$.ajax({
        data:  null,
        url:   '/TallerExcepcion/getSegmentos',
        type:  'post',
        success:  function (response) {
                var monedas = [];
                for(var i=0; i < response.length; i++){
                    monedas[i] = {'Codigo': response[i].IdMoneda, 'name': response[i].Descripcion};
                }
                $scope.filterCotizacion.Segmentos = monedas;
                $scope.filterCotizacion.SegmentosAll = monedas;
        }
});

$.ajax({
        data:  null,
        url:   '/TallerExcepcion/getClientes',
        type:  'post',
        success:  function (response) {
                var monedas = [];
                for(var i=0; i < response.length; i++){
                    monedas[i] = {'Codigo': response[i].IdMoneda, 'name': response[i].Descripcion};
                }
                $scope.filterCotizacion.Clientes = monedas;
                $scope.filterCotizacion.ClientesAll = monedas;
        }
});







//$scope.companies = [
//                    { 'Monto':'Infosys Technologies',
//                    	'HoraInicio': 125000,
//                    	'HoraFinal': 'Bangalore'},
//                    	{ 'Monto':'Cognizant Technologies',
//	                    	'HoraInicio': 100000,
//	                    	'HoraFinal': 'Bangalore'}
//                    ];
$scope.reglas = [];
//<td>{{item.segmento}}</td>
//		                <td>{{item.cliente}}</td>
//		                <td>{{item.logica}}</td>
//                        <td>{{item.monto}}</td>
//                        <td>{{item.moneda}}</td>
//                        <td>{{item.solicitud}}</td>
//                        <td>{{item.periodoFechas}}</td>
//		                <td>{{item.periodoHorario}}</td>
//		                <td>{{item.indicador}}</td>

$scope.SeleccionarSegmentos = function(){

    //$scope.filterCotizacion.Segmentos[$scope.filterCotizacion.Segmentos.length] = {'Codigo': '10', 'name': '[NUEVO]'};
    //console.log($scope.filterCotizacion.SegmentoDisponible[0].Codigo);
    $scope.filterCotizacion.SegmentosSeleccionados = [];
    for(var i = 0; i < $scope.filterCotizacion.SegmentoDisponible.length; i++){
        $scope.filterCotizacion.SegmentosSeleccionados[$scope.filterCotizacion.SegmentosSeleccionados.length] = {'Codigo': $scope.filterCotizacion.SegmentoDisponible[i], 'name': $scope.filterCotizacion.SegmentoDisponible[i]};
    }
console.log("cerrando");    
    ngDialog.close();
}

$scope.SegmentoFilter_Change = function(){
    if($scope.filterCotizacion.SegmentoFilter == null || $scope.filterCotizacion.SegmentoFilter == ""){
        $scope.filterCotizacion.Segmentos = $scope.filterCotizacion.SegmentosAll;
        return;
    }
         
    var Segmentos = [];
    for(var i=0;i<$scope.filterCotizacion.SegmentosAll.length;i++){
        if($scope.filterCotizacion.SegmentosAll[i].name.toLowerCase().indexOf($scope.filterCotizacion.SegmentoFilter.toLowerCase()) > -1){
            Segmentos[Segmentos.length] = $scope.filterCotizacion.SegmentosAll[i];
        }
    }

    $scope.filterCotizacion.Segmentos = Segmentos;
}

$scope.ClienteFilter_Change = function(){
    if($scope.filterCotizacion.ClienteFilter == null || $scope.filterCotizacion.ClienteFilter == ""){
        $scope.filterCotizacion.Clientes = $scope.filterCotizacion.ClientesAll;
        return;
    }
         
    var clientes = [];
    for(var i=0;i<$scope.filterCotizacion.ClientesAll.length;i++){
        if($scope.filterCotizacion.ClientesAll[i].name.toLowerCase().indexOf($scope.filterCotizacion.ClienteFilter.toLowerCase()) > -1){
            clientes[clientes.length] = $scope.filterCotizacion.ClientesAll[i];
        }
    }

    $scope.filterCotizacion.Clientes = clientes;
}

$scope.MonedaFilter_Change = function(){
    if($scope.filterCotizacion.MonedaFilter == null || $scope.filterCotizacion.MonedaFilter == ""){
        $scope.filterCotizacion.Monedas = $scope.filterCotizacion.MonedasAll;
        return;
    }
         
    var Monedas = [];
    for(var i=0;i<$scope.filterCotizacion.MonedasAll.length;i++){
        if($scope.filterCotizacion.MonedasAll[i].name.toLowerCase().indexOf($scope.filterCotizacion.MonedaFilter.toLowerCase()) > -1){
            Monedas[Monedas.length] = $scope.filterCotizacion.MonedasAll[i];
        }
    }

    $scope.filterCotizacion.Monedas = Monedas;
}


$scope.SeleccionarClientes = function(){

    //$scope.filterCotizacion.Segmentos[$scope.filterCotizacion.Segmentos.length] = {'Codigo': '10', 'name': '[NUEVO]'};
    //console.log($scope.filterCotizacion.SegmentoDisponible[0].Codigo);
    $scope.filterCotizacion.ClientesSeleccionados = [];
    for(var i = 0; i < $scope.filterCotizacion.ClienteDisponible.length; i++){
        $scope.filterCotizacion.ClientesSeleccionados[$scope.filterCotizacion.ClientesSeleccionados.length] = {'Codigo': $scope.filterCotizacion.ClienteDisponible[i], 'name': $scope.filterCotizacion.ClienteDisponible[i]};
    }
    
    ngDialog.close();
}

$scope.SeleccionarMonedas = function(){

    //$scope.filterCotizacion.Segmentos[$scope.filterCotizacion.Segmentos.length] = {'Codigo': '10', 'name': '[NUEVO]'};
    //console.log($scope.filterCotizacion.SegmentoDisponible[0].Codigo);
    $scope.filterCotizacion.MonedasSeleccionadas = [];
    for(var i = 0; i < $scope.filterCotizacion.MonedaDisponible.length; i++){
        $scope.filterCotizacion.MonedasSeleccionadas[$scope.filterCotizacion.MonedasSeleccionadas.length] = {'Codigo': $scope.filterCotizacion.MonedaDisponible[i], 'name': $scope.filterCotizacion.MonedaDisponible[i]};
    }
    
    ngDialog.close();
}



$scope.addRow = function(){
	    $scope.reglas.push({ 
            'segmento': ($scope.filterCotizacion.SegmentosSeleccionados.length>0)?$scope.filterCotizacion.SegmentosSeleccionados[0].name:"", 
            'cliente': ($scope.filterCotizacion.ClientesSeleccionados.length)?$scope.filterCotizacion.ClientesSeleccionados[0].name:"", 
            'logica':$scope.filterCotizacion.Logica,
            'monto': $scope.filterCotizacion.Monto,
            'moneda': ($scope.filterCotizacion.MonedasSeleccionadas.length>0)?$scope.filterCotizacion.MonedasSeleccionadas[0].name:"", 
            'solicitud': $scope.filterCotizacion.Solicitud,
            'periodoFechas': $("#FechaDesde").val() + " - " + $("#FechaHasta").val(),
            'periodoHorario': (($scope.filterCotizacion.HoraInicio == null)?"":$scope.filterCotizacion.HoraInicio) + " - " + (($scope.filterCotizacion.HoraFinal == null)?"":$scope.filterCotizacion.HoraFinal),
            'indicador': $scope.reglas.length + 1
        });

        $scope.filterCotizacion.SegmentosSeleccionados = [];
        $scope.filterCotizacion.ClientesSeleccionados = [];
        $scope.Logica = null;
	    $scope.filterCotizacion.Monto = '';
        $("#FechaDesde").val("");
        $("#FechaHasta").val("");
	    $scope.filterCotizacion.HoraInicio = '';
	    $scope.filterCotizacion.HoraFinal = '';

        };
});





