let currentActiveSection = 0;
let currentActiveSectionContent = 0;
let sectionsNames = ["ABOUT ME" , "BEST PROJECTS" , "PORTFOLIO" , "ALL PROJECTS" , "ARCHIVES" ]
let subSectionIndex = 0;
let sortKeys = ["all","technical","games","art"]
let locked = false;
let subLoaded = false;
let titleTemp = "";
let loadSubMenus = null;
let allContents = []

$(document).ready(function(){
    $('#loader-layout-menu').load('elements/layout-menu.html', () => {
        UpdateMenuItemsIndex(0);
    });

    LoadContent("AboutMe",'pages/about-me.html', '#content' , 0)
    //LoadContent("AboutMe",'pages/about-me.html', '#content' , 0)\

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
});

function UpdateMenuItemsIndex(sectionIndex){
    $(".menu-icons").each(function(i, element) {
        if(i == sectionIndex)
            $(element).addClass("active");
        else
            $(element).removeClass("active");
    });

    currentActiveSection = sectionIndex;

    UpdateMainTitle();
}

function LoadContent(name , path , parent , sectionIndex){
    UpdateMenuItemsIndex(sectionIndex);

    for (let i = 0; i < allContents.length; i++){
        if(allContents[i].content.loaded){
            UnloadContent(allContents[i]);
        }
    }

    let loadNeed = true;

    for (let i = 0; i < allContents.length; i++){
        if(allContents[i].name == name){
            currentActiveSectionContent = i;
            allContents[i].content.content.appendTo( "#content" );
            allContents[i].content.loaded = true;
            loadNeed = false;
        }
    }

    if(loadNeed) {
        $("#tempLoader").load(path , () => {
            let temp = $("#content-main").detach();
            temp.appendTo( "#content" );

            allContents.push({
                name: name,
                content: new ContentElement(temp)
            })
            currentActiveSectionContent = allContents.length - 1;
        });
    }

    setTimeout(() => {
        loadSubMenus(false);
    }, 200)
}

function  UnloadContent(contentToUnload){
    let temp = $("#content-main").detach();
    contentToUnload.content.loaded = false;
    contentToUnload.content.content = temp;
}


function UpdateMainTitle(){
    $('#main-title').text(sectionsNames[currentActiveSection]);
}

class ContentElement{
    content = null;
    loaded = false;

    constructor(content) {
        this.content = content;
        this.loaded = true;
    }
}