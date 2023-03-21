OpenMenu("#layout-menu-side-bar");
OpenMenu("#layout-menu-side-items");

loadSubMenus = LoadSubMenus;

function LoadSubMenus(open){
    if(currentActiveSection == 3 && open == true){
        locked = true;
        if(subLoaded == false) {
            $("#sub-menu-items").load("elements/sub-menu-projects.html");
            subLoaded = true;
        }
    }
    else{
        locked = false;
        setTimeout(() => {
            if(locked == false){
                $("#sub-menu-items-content").detach();
                subLoaded = false;
            }
        }, 200);
    }
}

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

        $("#menu-resume-button").addClass("show");
        $("#menu-resume-button").removeClass("hide");

        $("#menu-social-icons").addClass("show");
        $("#menu-social-icons").removeClass("hide");

    $("#sub-menu-items").addClass("show");
    $("#sub-menu-items").removeClass("hide");
    LoadSubMenus(true);
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

        $("#menu-resume-button").addClass("hide");
        $("#menu-resume-button").removeClass("show");

        $("#menu-social-icons").addClass("hide");
        $("#menu-social-icons").removeClass("show");

    $("#sub-menu-items").addClass("hide");
    $("#sub-menu-items").removeClass("show");
    LoadSubMenus(false);

});


}