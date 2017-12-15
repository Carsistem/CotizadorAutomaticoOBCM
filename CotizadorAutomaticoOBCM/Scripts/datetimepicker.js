console.log("antes datetime asdf asdf asdfpicker");
app.directive('datetimepicker', function () {
    console.log("directiva iniciada datetimepicker");
    return {
        restrict: 'AE',
        require: '?ngModel',
        scope: {
            onChange: '&'
        },
        link: function (scope, element, attrs, ngModelCtrl) {
console.log("link datetimepicker");
            element.datetimepicker({
                viewMode: 'days',
                format: 'DD/MM/YYYY',
                locale: 'es'
            }).on('dp.change', function (e) {
                ngModelCtrl.$setViewValue(e.target.value);
            });
        }
    };
});