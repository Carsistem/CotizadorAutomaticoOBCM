var app = angular.module('app', ['ui.bootstrap', 'ui.bootstrap.datetimepicker']);

app.controller('MyController', ['$scope', function($scope) {
  
  var that = this;
  
  this.date = {
    value: new Date(),
    showFlag: false
  };
  
  this.openCalendar = function(e, date) {
      that.open[date] = true;
  };
  
}]);