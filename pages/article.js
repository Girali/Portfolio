function LoadArticleInteraction(){
    resizeArticle = ResizeContent;
    $('#content-article-container').tilt({
        speed: 1500,
        maxTilt: 0.5
    })

    $('.content-article-button-selector').each(function(i, element) {
        $(element).click(function(){
            $(this).addClass('article-button-selected')
            .siblings().removeClass('article-button-selected');

            let v = $(this).attr('value');

            if(v === "main"){
                $("#content-article-box-main").addClass("active-panel").removeClass("hide-panel");
                $("#content-article-box-main").siblings().removeClass("active-panel").addClass("hide-panel");
            }
            else if (v === "gallery"){
                $("#content-article-box-gallery").addClass("active-panel").removeClass("hide-panel");
                $("#content-article-box-gallery").siblings().removeClass("active-panel").addClass("hide-panel");
            }
            else if (v === "more"){
                $("#content-article-box-more").addClass("active-panel").removeClass("hide-panel");
                $("#content-article-box-more").siblings().removeClass("active-panel").addClass("hide-panel");
            }

            $("#content-article-box-bars").removeClass("hide-panel");

            $(this).find(".content-article-button-underbars").addClass("show").removeClass("hide");
            $(this).find(".content-article-button-underbars-dashed").addClass("hide").removeClass("show");
            $(this).find(".content-article-button-text").addClass("content-article-button-text-selected");


            $(this).siblings().find(".content-article-button-underbars-dashed").addClass("show").removeClass("hide");
            $(this).siblings().find(".content-article-button-underbars").addClass("hide").removeClass("show");
            $(this).siblings().find(".content-article-button-text").removeClass("content-article-button-text-selected");

            ResizeContent();
        });
    });

    $('.icons').each(function(i, element) {
        $(element).mouseenter(function(){
            $('#label').addClass('show');
            $('#label').removeClass('hide');

            var rect = element.getBoundingClientRect();
            $('#label').css('top', rect.y + 52);
            $('#label').css('left', rect.x - 130);

            $('#label-text').text($(element).attr('value'));
        }).mouseleave(function(){
            $('#label').addClass('hide');
            $('#label').removeClass('show');
        });
    });

    ResizeContent();


}

function ResizeContent(){
    setTimeout(  ()=> {
        let h = $(".active-panel").height();
        $("#content-article-box").css({"height": h});
    }, 50);
}