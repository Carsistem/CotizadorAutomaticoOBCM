app.controller('dashboardTRCtrl', ['$scope', function ($scope) {

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
            labels: ['Dolar(USD)', 'Dolar(USB)', 'Euro', 'Libra','CHF','JPY'],
            series: ['Normal', 'T'],
            data: [[30, 25, 20.41, 15, 20, 23], [-18, -24, -15, -26.90, -23, -22]]
        };

    $scope.completarPieChart = function () {
        var ctx = document.getElementById("pieChart");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Directa", "Corredores", "Clientes", "FIDEIMPO"],
                datasets: [{
                    label: '# of Votes',
                    data: [3502, 320, 1689,180],
                    backgroundColor: [
                       '#F19B9B',
                        '#9BF19D',
                        '#9BA9F1',
                        'moccasin'
                    ],
                    borderColor: [
                        'rgba(255,255,255,1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
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