

$(document).ready(function(){
    $('#loader-layout-menu').load('elements/layout-menu.html', LoadInterfaceInteraction());
});

function LoadInterfaceInteraction(){
    $('.content-box').each(function(i, element) {
        $(element).mouseenter(function(){
            $(element).find('.content-box-title').removeClass("show");
            $(element).find('.content-box-content').removeClass("content-retracted");
            $(element).find('.content-box-content').removeClass("content-box-content-neon-off");
            $(element).find('.content-box-content').find('img').removeClass("show");
            $(element).find('.content-box-content').find('.content-box-content-details').removeClass("hide");
            $(element).find('.aug-blue-shadow').removeClass("content-retracted");

            $(element).find('.content-box-title').addClass("hide");
            $(element).find('.content-box-content').addClass("content-extend");
            $(element).find('.content-box-content').addClass("content-box-content-neon-on");
            $(element).find('.content-box-content').find('img').addClass("hide");
            $(element).find('.content-box-content').find('.content-box-content-details').addClass("show");
            $(element).find('.aug-blue-shadow').addClass("content-extend");

            SetMainTitle($(element).attr('value'));
        }).mouseleave(function(){
            $(element).find('.content-box-title').removeClass("hide");
            $(element).find('.content-box-content').removeClass("content-extend");
            $(element).find('.content-box-content').removeClass("content-box-content-neon-on");
            $(element).find('.content-box-content').find('img').removeClass("hide");
            $(element).find('.content-box-content').find('.content-box-content-details').removeClass("show");
            $(element).find('.aug-blue-shadow').removeClass("content-extend");

            $(element).find('.content-box-title').addClass("show");
            $(element).find('.content-box-content').addClass("content-retracted");
            $(element).find('.content-box-content').addClass("content-box-content-neon-off");
            $(element).find('.content-box-content').find('img').addClass("show");
            $(element).find('.content-box-content').find('.content-box-content-details').addClass("hide");
            $(element).find('.aug-blue-shadow').addClass("content-retracted");

            UnsetMainTitle();
        });
    });

    $('.icons').each(function(i, element) {
        $(element).mouseenter(function(){
            $('#label').addClass('show');
            $('#label').removeClass('hide');

            var rect = element.getBoundingClientRect();
            $('#label').css('top', rect.y + 32);
            $('#label').css('left', rect.x - 140);

            $('#label-text').text($(element).attr('value'));
        }).mouseleave(function(){
            $('#label').addClass('hide');
            $('#label').removeClass('show');
        });
    });
}


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