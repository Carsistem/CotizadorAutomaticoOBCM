$(document).ready(function () {
    buscarMenu;
});

var buscarMenu = function () {
    //Evento Input del Search Box.
    $(".search-menu-box").on('input', function () {
        //filter = valor ingresado en el SearchBox
        var filter = $(this).val();
        //obtiene todos los elementos del sideBar
        $(".sidebar-menu > li").each(function () {
            //Oculta los elementos que no coincidan con la busqueda.
            if ($(this).text().search(new RegExp(filter, "i")) < 0 && $(this).text() != "MENU") {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        });
        //obtiene todos los elementos dentro de los DropDownList
        $(".treeview-menu > li").each(function () {
            //Oculta los elementos que no coincidan con la busqueda.
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        });
    });
};