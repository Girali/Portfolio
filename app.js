$(document).ready(function(){
    $("#layout-menu-side-bar").mouseenter(function(){
        $("#layout-menu-background-right").removeClass("layout-menu-background-right-close");
        $("#layout-menu-background-right").addClass("layout-menu-background-right-open");
    }).mouseleave(function(){
        $("#layout-menu-background-right").removeClass("layout-menu-background-right-open");
        $("#layout-menu-background-right").addClass("layout-menu-background-right-close");
    });

    $("#test").mouseenter(function(){
        $('#test').find('.content-box-title').removeClass("show");
        $('#test').find('.content-box-content').removeClass("content-retracted");
        $('#test').find('.content-box-content').removeClass("content-box-content-neon-off");
        $('#test').find('.content-box-content').find('img').removeClass("show");
        $('#test').find('.content-box-content').find('.content-box-content-details').removeClass("hide");
        $('#test').find('.aug-blue-shadow').removeClass("content-retracted");

        $('#test').find('.content-box-title').addClass("hide");
        $('#test').find('.content-box-content').addClass("content-extend");
        $('#test').find('.content-box-content').addClass("content-box-content-neon-on");
        $('#test').find('.content-box-content').find('img').addClass("hide");
        $('#test').find('.content-box-content').find('.content-box-content-details').addClass("show");
        $('#test').find('.aug-blue-shadow').addClass("content-extend");

        SetMainTitle($('#test').attr('value'));
    }).mouseleave(function(){
        $('#test').find('.content-box-title').removeClass("hide");
        $('#test').find('.content-box-content').removeClass("content-extend");
        $('#test').find('.content-box-content').removeClass("content-box-content-neon-on");
        $('#test').find('.content-box-content').find('img').removeClass("hide");
        $('#test').find('.content-box-content').find('.content-box-content-details').removeClass("show");
        $('#test').find('.aug-blue-shadow').removeClass("content-extend");

        $('#test').find('.content-box-title').addClass("show");
        $('#test').find('.content-box-content').addClass("content-retracted");
        $('#test').find('.content-box-content').addClass("content-box-content-neon-off");
        $('#test').find('.content-box-content').find('img').addClass("show");
        $('#test').find('.content-box-content').find('.content-box-content-details').addClass("hide");
        $('#test').find('.aug-blue-shadow').addClass("content-retracted");

        UnsetMainTitle();
    });
});

function SetMainTitle(newTitle){
    titleTemp = $('#main-title').text();
    $('#main-title').text(newTitle);
    $('#main-title').addClass('text-orange-glow');
}

function UnsetMainTitle(){
    $('#main-title').text(titleTemp);
    $('#main-title').removeClass('text-orange-glow');
}

let titleTemp = "";