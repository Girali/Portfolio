let currentActiveSection = 0;
let currentActiveSectionContent = 0;
let sectionsNames = ["ABOUT ME" , "BEST PROJECTS" , "PORTFOLIO" , "ALL PROJECTS" , "ARCHIVES" ]
let subSectionIndex = 0;
let sortKeys = ["all","technical","games","art"]
let titleTemp = "";
let allContents = []
let titleLoaded = false;
let firstTitleLoad = true;
let inArticle = false;
let articleLoaded = false;
let resizeArticle = false;
let isMobile = false;

let isBackAction = false;

let lastRegistredPage = null;
let registredPage = null;

let onScroll = null;

$(document).ready(function(){
    isMobile = window.screen.width < 768;

    $('#loader-layout-menu').load('elements/layout-menu.html', () => {
        UpdateMenuItemsIndex(3);
    });

    $("#img-preview").click( function (){
        $(this).addClass("hide-panel").removeClass("active-panel");
    })

    $("#img-preview-vertical").click( function (){
        $(this).addClass("hide-panel").removeClass("active-panel");
    })

    titleLoaded = false;
    //LoadArticle("Article-Vandalhalla", 'articles/vandalhalla.html', '#content');
    //LoadContent("BestProjects", 'pages/best-projects.html', '#content', 1)
    LoadContent("AboutMe",'pages/about-me.html', '#content' , 0);

    window.onpopstate = function(event) {
        event.preventDefault();
        isBackAction = true;
        lastRegistredPage.Load();
    };

    window.onscroll = function() {
        const totalPageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const currentScrollPosition = window.scrollY;
        const percentageScrolled = (currentScrollPosition / totalPageHeight) * 100;
        onScroll(percentageScrolled, currentScrollPosition);
    };
});

function SetCarouselInteraction(){
    $('.content-article-box-carousel').each(function(i, element) {
        $(element).find(".content-article-box-carousel-arrow.back").click(function(){
            let count = parseInt($(element).children("div").length);
            let index = parseInt($(element).attr("value"));
            let oldIndex = index;

            index -= 1;
            if(index < 0)
                index = count - 2;

            SetCarouselIndex(element,oldIndex,index);
        });

        $(element).find(".content-article-box-carousel-arrow.next").click(function(){
            let count = parseInt($(element).children("div").length);
            let index = parseInt($(element).attr("value"));
            let oldIndex = index;

            index = index + 1;
            if(index >= count-1)
                index = 0;

            SetCarouselIndex(element, oldIndex, index);
        });

        $(element).find(".content-article-box-carousel-buttons .content-article-box-carousel-slide").each(function(t, btns) {
            $(btns).click(() => {
                let oldIndex = parseInt($(element).attr("value"));
                let index = parseInt($(btns).attr("value"));

                SetCarouselIndex(element, oldIndex, index);
            });
        });

        SetCarouselIndex(element, 0, 0);
    });
}

function SetCarouselIndex(element, oldIndex, index){
    $(element).children().eq(oldIndex).removeClass("active-panel").addClass("hide-panel");
    $(element).children().eq(index).addClass("active-panel").removeClass("hide-panel");
    $(element).attr("value",index);

    $(element).find(".content-article-box-carousel-buttons .content-article-box-carousel-slide").each(function(t, btns) {
        let v = parseInt($(btns).attr("value"));

        if(v === index){
            $(btns).addClass("active-carousel-slide");
        }
        else if(v === oldIndex){
            $(btns).removeClass("active-carousel-slide");
        }
    });

    resizeArticle();
}

function LoadPreviewImgInteract(){
    $('.previewable').each(function(i, element) {
        $(element).click(function() {
            $("#img-preview").addClass("active-panel").removeClass("hide-panel");
            $("#img-preview").find("img").attr("src", $(element).attr("src"));
        })
    });

    $('.previewable-vertical').each(function(i, element) {
        $(element).click(function() {
            $("#img-preview-vertical").addClass("active-panel").removeClass("hide-panel");
            $("#img-preview-vertical").find("img").attr("src", $(element).attr("src"));
        })
    });
}

function OnLoadPageStart(){
    window.history.pushState({ page: 'myPage' }, '', '');

    window.onresize = null;
}

function OnLoadPageEnd(){
    window.onresize = resizeArticle;

    if(inArticle === true){
        const video = document.querySelector('video');
        if(video != null) {
            video.addEventListener('load', resizeArticle);
            video.addEventListener('loadeddata', resizeArticle);
        }

        let article = $("#content-article");
        $('#main-title').text($(article).attr('value'));

        SetCarouselInteraction();
    }

    if(currentActiveSection === 0){
        LoadAboutMeInteractions();
    }

    LoadPreviewImgInteract();
}

function LoadTitleInteraction(){
    $("#content-title-title").mouseenter(function() {
        $("#content-title-sub").addClass("sub-title-glow-orange");
        $("#content-title-sub").removeClass("sub-title-glow-blue");

        $("#content-title-main-orange").addClass("show");
        $("#content-title-main-blue").addClass("hide");

        $("#content-title-main-orange").removeClass("hide");
        $("#content-title-main-blue").removeClass("show");
    }).mouseleave(function(){
        $("#content-title-sub").removeClass("sub-title-glow-orange");
        $("#content-title-sub").addClass("sub-title-glow-blue");

        $("#content-title-main-orange").addClass("hide");
        $("#content-title-main-blue").addClass("show");

        $("#content-title-main-orange").removeClass("show");
        $("#content-title-main-blue").removeClass("hide");
    });
}

function LoadArticle(name , path , parent) {
    inArticle = true;
    lastRegistredPage = registredPage;
    registredPage = new LoadingEvent(name,path,parent,0, inArticle);

    OnLoadPageStart();

    TitleLoader(()=>{
        UpdateMenuItemsIndex(3);

        $("#content-main").remove();

        for (let i = 0; i < allContents.length; i++) {
            if (allContents[i].content.loaded) {
                allContents[i].content.loaded = false;
            }
        }

        let loadNeed = true;

        for (let i = 0; i < allContents.length; i++) {
            if (allContents[i].name === name) {
                currentActiveSectionContent = i;
                allContents[i].content.content.clone().appendTo(parent);
                allContents[i].content.loaded = true;
                loadNeed = false;
                LoadArticleInteraction();
                OnLoadPageEnd();
            }
        }

        if (loadNeed) {
            $("#tempLoader").load(path, () => {
                let temp = $("#content-main").detach();
                temp.appendTo(parent);

                allContents.push({
                    name: name,
                    content: new ContentElement(temp.clone())
                });

                currentActiveSectionContent = allContents.length - 1;

                allContents[currentActiveSectionContent].loaded = true;

                LoadArticleInteraction();
                OnLoadPageEnd();
            });
        }
    });
}

function LoadTitle(callback){
    titleLoaded = true;

    if(firstTitleLoad) {
        let path = 'elements/title.html';

        $("#tempLoader").load(path, () => {
            let temp = $("#content-title").detach();
            temp.appendTo("#content");
            firstTitleLoad = false;

            allContents.push({
                name: "Title",
                content: new ContentElement(temp.clone())
            });

            LoadTitleInteraction();

            callback();
        });
    }
    else{
        for (let i = 0; i < allContents.length; i++) {
            if (allContents[i].name === "Title") {
                allContents[i].content.content.clone().appendTo("#content");
                allContents[i].content.loaded = true;

                LoadTitleInteraction();
            }
        }
        callback();
    }
}

function TitleLoader(callback){
    if(inArticle){
        if(titleLoaded){
            $("#content-title").remove();
            titleLoaded = false;
        }
        callback();
    }
    else{
        if(!titleLoaded){
            LoadTitle(callback);
        }
        else{
            callback();
        }
    }
}

function UpdateMenuItemsIndex(sectionIndex){
    $(".menu-icons").each(function(i, element) {
        if(i === sectionIndex)
            $(element).addClass("active");
        else
            $(element).removeClass("active");
    });

    currentActiveSection = sectionIndex;

    UpdateMainTitle();
}

function LoadContent(name , path , parent , sectionIndex) {
    inArticle = false;
    lastRegistredPage = registredPage;
    registredPage = new LoadingEvent(name,path,parent,sectionIndex,inArticle);

    OnLoadPageStart();

    TitleLoader(() => {
        UpdateMenuItemsIndex(sectionIndex);

        $("#content-main").remove();

        for (let i = 0; i < allContents.length; i++) {
            if (allContents[i].content.loaded) {
                allContents[i].content.loaded = false;
            }
        }

        let loadNeed = true;

        for (let i = 0; i < allContents.length; i++) {
            if (allContents[i].name === name) {
                currentActiveSectionContent = i;
                allContents[i].content.content.clone().appendTo(parent);
                allContents[i].content.loaded = true;
                loadNeed = false;

                if (currentActiveSection === 3) {
                    SortItems(sortKeys[subSectionIndex]);
                }

                if (currentActiveSection === 1) {
                    LoadBestProjectsInteraction();
                }

                OnLoadPageEnd();
            }
        }

        if (loadNeed) {
            $("#tempLoader").load(path, () => {
                let temp = $("#content-main").detach();
                temp.appendTo(parent);

                allContents.push({
                    name: name,
                    content: new ContentElement(temp.clone())
                });

                currentActiveSectionContent = allContents.length - 1;

                allContents[currentActiveSectionContent].loaded = true;

                if (currentActiveSection === 3) {
                    SortItems(sortKeys[subSectionIndex]);
                }

                if (currentActiveSection === 1) {
                    LoadBestProjectsInteraction();
                }

                OnLoadPageEnd();
            });
        }

        if(!isBackAction)
            LoadSubMenus(true);

        isBackAction= false;
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



function SortItems(key){
    $("#content-main").remove();

    allContents[currentActiveSectionContent].content.content.clone().appendTo("#content");

    if (key != "all") {
        $(".content-box").each(function (i, element) {
            if ($(element).attr('content-type') != key) {
                $(element).remove();
            }
        })
    }

    LoadInterfaceInteraction();
}

function UpdateMainTitle(){
    $('#main-title').text(sectionsNames[currentActiveSection]);
}

class LoadingEvent{
    name = "";
    path = "";
    parent = "";
    sectionIndex = "";
    isArticle= false;
    constructor(n,pat,par,si,ia) {
        this.name = n;
        this.path= pat;
        this.parent = par;
        this.sectionIndex = si;
        this.isArticle = ia;
    }

    Load(){
        if(this.isArticle){
            LoadArticle(this.name, this.path, this.parent);
        }
        else{
            LoadContent(this.name, this.path, this.parent, this.sectionIndex);
        }
    }
}

class ContentElement{
    content = null;
    loaded = false;

    constructor(content) {
        this.content = content;
        this.loaded = true;
    }
}