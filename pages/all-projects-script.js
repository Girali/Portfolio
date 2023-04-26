function LoadInterfaceInteraction() {
    fetch('pages/all-projects.json')
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;

            let dataToLoad = [];

            $('.content-box').each(function(i, element) {
                let article = null;
                let name = $(element).attr('value');
                for (let i = 0; i < articles.length; i++){
                    if(name == articles[i].title)
                        article = articles[i];
                }

                dataToLoad.push({
                    element: element,
                    article: article
                });
            });

            LoadContentBox(dataToLoad, 0);

        })
        .catch(error => console.error(error));

    LoadInteractionAtTheEnd();
}

function LoadContentBox(data, index){
    if(index < data.length && !inArticle) {
        let element = data[index].element;
        let article = data[index].article;

        $(element).append($("#loaded-content-box").clone().html());

        let path = article.path;
        let title = article.title;
        let subTitle = article.sub_title;
        let description = article.description;
        let image = article.image;
        let icons = article.icons;
        let onClick = "LoadArticle('Article-" + title + "', '" + path + "', '#content')";

        $(element).find('.content-box-title').text(title);
        $(element).find('.content-box-content-details-title').text(subTitle);
        $(element).find('.content-box-content-details-description').text(description);
        $(element).find('.content-box-content img').attr("src", image);
        $(element).find('.content-box-content-details-readme a').attr("onclick", onClick);

        let iter = 0;
        $(element).find('.icons').each(function (i, icon) {
            if (iter < icons.length) {
                $(icon).attr("value", icons[iter].title);
                $(icon).find("object").attr("data", icons[iter].image);
            } else {
                $(icon).remove();
            }
            iter++;
        });

        $(element).imagesLoaded().always(function () {
            LoadContentBox(data, index + 1);
            $(element).find(".content-box-content-loading").addClass("hide");

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
        });
    }
}

function LoadInteractionAtTheEnd(){
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
}