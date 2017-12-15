app.controller('FeriadosCtrl', ['$scope', 'ngDialog',
function ($scope, ngDialog) {

    $scope.TiposFeriado = [
        { Codigo: 'ARG', Descripcion: 'Feriado Argentina' },
        { Codigo: 'USA', Descripcion: 'Feriado USA' },
        { Codigo: 'AMB', Descripcion: 'Feriado ARG/USA' }
    ];

    $scope.nuevoFeriado = {};
    $scope.feriadoSeleccionado = {};

    let calendarOption = {
        allowOverlap: false,
        enableRangeSelection: false,
        language: 'es',
        minDate: new Date("01/01/2016"),
        maxDate: new Date("12/31/2018"),
        style: 'custom',
        dataSource: [
            { name: 'Feriado ARG/USA', location: 'AMB', startDate: new Date("03/25/2017"), endDate: new Date("03/25/2017") },            
            { name: 'Feriado ARG/USA', location: 'AMB', startDate: new Date("04/14/2017"), endDate: new Date("04/14/2017") },
            { name: 'Feriado ARG/USA', location: 'AMB', startDate: new Date("10/09/2017"), endDate: new Date("10/09/2017") },
            { name: 'Feriado ARG/USA', location: 'AMB', startDate: new Date("12/25/2017"), endDate: new Date("12/25/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("02/27/2017"), endDate: new Date("01/01/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("02/28/2017"), endDate: new Date("02/28/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("03/24/2017"), endDate: new Date("03/24/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("04/13/2017"), endDate: new Date("04/13/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("05/01/2017"), endDate: new Date("05/01/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("05/25/2017"), endDate: new Date("05/25/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("06/20/2017"), endDate: new Date("06/20/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("08/21/2017"), endDate: new Date("08/21/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("10/16/2017"), endDate: new Date("10/16/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("11/06/2017"), endDate: new Date("11/06/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("11/27/2017"), endDate: new Date("11/27/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("12/08/2017"), endDate: new Date("12/08/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("11/28/2017"), endDate: new Date("11/28/2017") },
            { name: 'Feriado Argentina', location: 'ARG', startDate: new Date("12/09/2017"), endDate: new Date("12/09/2017") },
            { name: 'Feriado USA', location: 'USA', startDate: new Date("01/02/2017"), endDate: new Date("01/02/2017") },
            { name: 'Feriado USA', location: 'USA', startDate: new Date("01/16/2017"), endDate: new Date("01/16/2017") },
            { name: 'Feriado USA', location: 'USA', startDate: new Date("02/20/2017"), endDate: new Date("02/20/2017") },
            { name: 'Feriado USA', location: 'USA', startDate: new Date("05/29/2017"), endDate: new Date("05/29/2017") },
            { name: 'Feriado USA', location: 'USA', startDate: new Date("07/04/2017"), endDate: new Date("07/04/2017") },
            { name: 'Feriado USA', location: 'USA', startDate: new Date("09/04/2017"), endDate: new Date("09/04/2017") },
            { name: 'Feriado USA', location: 'USA', startDate: new Date("11/10/2017"), endDate: new Date("11/10/2017") },
            { name: 'Feriado USA', location: 'USA', startDate: new Date("11/23/2017"), endDate: new Date("11/23/2017") },
            { name: 'Feriado USA', location: 'USA', startDate: new Date("12/26/2017"), endDate: new Date("12/26/2017") }
        ],
        customDataSourceRenderer: function (element, date, events) {            
            if(events)
            {
                switch (events[0].location) {
                    case 'ARG':
                        element.parent().addClass('ColorFeriadoARG');
                        break;
                    case 'USA':
                        element.parent().addClass('ColorFeriadoUSA');
                        break;
                    case 'AMB':
                        element.parent().addClass('ColorFeriadoAMB');
                        break;
                    default:
                        element.parent().addClass('ColorFeriadoDefault');
                        break;
                }                
            }
        },
        clickDay: function (e) {

            if (e.events.length > 0)
            {
                $scope.feriadoSeleccionado.fecha = e.date;
                $scope.feriadoSeleccionado.evento = e.events[0];

                ngDialog.open({
                    template: 'eliminarFeriado',
                    className: 'ngdialog-theme-default',
                    showClose: false,
                    scope: $scope,
                    width: '730px'
                });
            }
            else{
                $scope.nuevoFeriado.fecha = e.date;

                ngDialog.open({
                    template: 'agregarFeriado',
                    className: 'ngdialog-theme-default',
                    showClose: false,
                    scope: $scope,
                    width: '730px'
                });
            }
        }
    };

    $('.calendar').calendar(calendarOption);

    $scope.agregarFeriado = function () {
        $('.calendar').data('calendar').addEvent({ name: 'Nuevo Feriado', location: $scope.nuevoFeriado.tipoFeriado, startDate: $scope.nuevoFeriado.fecha, endDate: $scope.nuevoFeriado.fecha });
            
        ngDialog.close();
    };

    $scope.eliminarFeriado = function () {
        let ds = calendarOption.dataSource;
        ds.splice(ds.indexOf($scope.feriadoSeleccionado.evento), 1);
        $('.calendar').data('calendar').setDataSource(ds);

        ngDialog.close();
    };

}]);