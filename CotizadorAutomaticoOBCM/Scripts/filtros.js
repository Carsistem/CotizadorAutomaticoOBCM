'use strict';
app.filter("contabNeg", function () {
    return function (item) {
        if (item != null) {
            if (item < 0)
                return '(' + Math.abs(item).toLocaleString() + ')';
            else
                return item.toLocaleString();
        }
        return "";
    };
});