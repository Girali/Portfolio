OpenMenu("#layout-menu-side-bar");
OpenMenu("#layout-menu-side-items");
function OpenMenu(s){
$(s).mouseenter(function(){
        $("#layout-menu-background-right").removeClass("layout-menu-background-right-close");
        $("#layout-menu-side-bar").removeClass("layout-menu-side-bar-close");
    $("#layout-menu-side-items").removeClass("layout-menu-side-items-close");
        $("#layout-menu-background-right").addClass("layout-menu-background-right-open");
        $("#layout-menu-side-bar").addClass("layout-menu-side-bar-open");
    $("#layout-menu-side-items").addClass("layout-menu-side-items-open");
        $(".menu-icons-text").each(function(i, element) {
            $(element).addClass("show-quick");
            $(element).removeClass("hide-quick");
        })
    }).mouseleave(function(){
        $("#layout-menu-background-right").removeClass("layout-menu-background-right-open");
    $("#layout-menu-side-bar").removeClass("layout-menu-side-bar-open");
    $("#layout-menu-side-items").removeClass("layout-menu-side-items-open");
        $("#layout-menu-background-right").addClass("layout-menu-background-right-close");
    $("#layout-menu-side-bar").addClass("layout-menu-side-bar-close");
    $("#layout-menu-side-items").addClass("layout-menu-side-items-close");

        $(".menu-icons-text").each(function(i, element) {
            $(element).addClass("hide-quick");
            $(element).removeClass("show-quick");
        })
    });
}