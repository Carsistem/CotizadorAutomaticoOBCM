app.controller('dashboardCtrl', ['$scope', function ($scope) {

    //carga de la pagina
    this.$onInit = Load;

    function Load() {
        $scope.completarPieChart();
        //$('select').select2();
        //$('ul').tree();
    };

    $scope.graficoMoneda =
        {
            options: { legend: { display: true } },
            labels: ['Dolar(USD)', 'Dolar(USB)', 'Euro', 'Libra'],
            series: ['Ayer', 'Hoy'],
            data: [[17.49, 17.52, 20.41, 26.7], [17.58, 17.85, 20.92, 26.90]]
        };

    $scope.completarPieChart = function () {
        var ctx = document.getElementById("pieChart");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Compra", "Venta"],
                datasets: [{
                    label: '# of Votes',
                    data: [65, 35],
                    backgroundColor: [
                        '#D6EAF8',
                        'moccasin'
                    ],
                    borderColor: [
                        'rgba(255,255,255,1)',
                        'rgba(255, 255, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                }
            }
        });
    }
}]);