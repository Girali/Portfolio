$(document).ready(function(){
    $("#layout-side-bar").mouseenter(function(){
        $("#menu-background").finish().animate({

            opacity: "1"
        }, 500);
    }).mouseleave(function(){
        $("#menu-background").finish().animate({
            opacity: "0"
        },500);
    });
});