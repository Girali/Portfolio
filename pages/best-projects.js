function LoadBestProjectsInteraction()
{
    $("#best-proj-content-main").tilt({
        speed: 1500,
        maxTilt: 1
    })

    $('.best-proj-content-sub').each(function (i, element) {
        $(element).tilt({
            speed: 1500,
            maxTilt: 1,
            scale: 1.05
        })

        $(element).mouseenter(function () {
            $(element).find('.best-proj-content-sub-box').addClass("best-proj-sub-open");

            $(element).find('.best-proj-content-sub-box').find('.best-proj-content-sub-box-img').addClass("best-proj-content-sub-box-img-open");

            $(element).find('.best-proj-content-sub-box').find('.darker-tint-filter').removeClass("show");
            $(element).find('.best-proj-content-sub-box').find('.darker-tint-filter').addClass("hide");

            SetMainTitle($(element).attr('value'));

        }).mouseleave(function () {
            $(element).find('.best-proj-content-sub-box').removeClass("best-proj-sub-open");

            $(element).find('.best-proj-content-sub-box').find('.best-proj-content-sub-box-img').removeClass("best-proj-content-sub-box-img-open");

            $(element).find('.best-proj-content-sub-box').find('.darker-tint-filter').addClass("show");
            $(element).find('.best-proj-content-sub-box').find('.darker-tint-filter').removeClass("hide");

            UnsetMainTitle();
        });
    });

    $('.icons-up').each(function(i, element) {
        $(element).mouseenter(function(){
            $('#label-up').addClass('show');
            $('#label-up').removeClass('hide');

            var rect = element.getBoundingClientRect();
            $('#label-up').css('top', rect.y - 35);
            $('#label-up').css('left', rect.x + 20);

            $('#label-up-text').text($(element).attr('value'));
        }).mouseleave(function(){
            $('#label-up').addClass('hide');
            $('#label-up').removeClass('show');
        });
    });
}
