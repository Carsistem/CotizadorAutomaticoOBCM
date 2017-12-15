$.AdminLTE = {};

var DataKey = 'lte.layout'

var Default = {
    slimscroll: true,
    resetHeight: true
}

var Selector = {
    wrapper: '.wrapper',
    contentWrapper: '.content-wrapper',
    layoutBoxed: '.layout-boxed',
    mainFooter: '.main-footer',
    mainHeader: '.main-header',
    sidebar: '.sidebar',
    controlSidebar: '.control-sidebar',
    fixed: '.fixed',
    sidebarMenu: '.sidebar-menu',
    logo: '.main-header .logo'
}

var ClassName = {
    fixed: 'fixed',
    holdTransition: 'hold-transition'
}

$.AdminLTE.fix = function () {
    // Remove overflow from .wrapper if layout-boxed exists
    $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden')

    // Get window height and the wrapper height
    var footerHeight = $(Selector.mainFooter).outerHeight() || 0
    var neg = $(Selector.mainHeader).outerHeight() + footerHeight
    var windowHeight = $(window).height()
    var sidebarHeight = $(Selector.sidebar).height() || 0

    // Set the min-height of the content and sidebar based on
    // the height of the document.
    if ($('body').hasClass(ClassName.fixed)) {
        $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight)
    } else {
        var postSetHeight

        if (windowHeight >= sidebarHeight) {
            $(Selector.contentWrapper).css('min-height', windowHeight - neg)
            postSetHeight = windowHeight - neg
        } else {
            $(Selector.contentWrapper).css('min-height', sidebarHeight)
            postSetHeight = sidebarHeight
        }

        // Fix for the control sidebar height
        var $controlSidebar = $(Selector.controlSidebar)
        if (typeof $controlSidebar !== 'undefined') {
            if ($controlSidebar.height() > postSetHeight)
                $(Selector.contentWrapper).css('min-height', $controlSidebar.height())
        }
    }
}


$.AdminLTE.fixSidebar = function () {
    // Make sure the body tag has the .fixed class
    if (!$('body').hasClass(ClassName.fixed)) {
        if (typeof $.fn.slimScroll !== 'undefined') {
            $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')
        }
        return
    }

    // Enable slimscroll for fixed layout
    if (this.options.slimscroll) {
        if (typeof $.fn.slimScroll !== 'undefined') {
            // Destroy if it exists
            $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')

            // Add slimscroll
            $(Selector.sidebar).slimScroll({
                height: ($(window).height() - $(Selector.mainHeader).height()) + 'px',
                color: 'rgba(0,0,0,0.2)',
                size: '3px'
            })
        }
    }
}


$.AdminLTE.activate = function ()
{
    $.AdminLTE.fix();
    $.AdminLTE.fixSidebar();
    buscarMenu();
}