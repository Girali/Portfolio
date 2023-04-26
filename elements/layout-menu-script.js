OpenMenu("#layout-menu-side-bar");
OpenMenu("#layout-menu-side");
OpenMenu("#layout-menu-side-items");

function LoadSubMenus(open){
    if(!inArticle) {
        if (currentActiveSection == 3 && open == true) {
            $("#sub-menu-items").removeClass("hide-panel").addClass("active-panel-slow");
        } else {
            $("#sub-menu-items").removeClass("active-panel-slow").addClass("hide-panel");
        }
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

        $("#sub-menu-items").removeClass("hide-panel").addClass("active-panel-slow");

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

        $("#sub-menu-items").removeClass("hide-panel").addClass("active-panel-slow");

        LoadSubMenus(false);
});
}

function UpdateSubItems(sectionIndex){
    subSectionIndex = sectionIndex;
    $(".menu-sub-item").each(function(i, element) {
        if(i == subSectionIndex){
            $(element).addClass("active-sub");
        }
        else{
            $(element).removeClass("active-sub");
        }
    });
}