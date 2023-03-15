let currentActiveSection = 0;

$(document).ready(function(){
    $('#loader-layout-menu').load('elements/layout-menu.html');
    LoadContent("AboutMe",'pages/about-me.html', '#content' , 0)

    setTimeout(() =>{
        UpdateMenuItemsIndex(0);
    }, 500)
});

function UpdateMenuItemsIndex(sectionIndex){
    $(".menu-icons").each(function(i, element) {
        console.log(i + "  " + sectionIndex);
        if(i == sectionIndex)
            $(element).addClass("active");
        else
            $(element).removeClass("active");
    });

    currentActiveSection = sectionIndex;
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
            allContents[i].content.content.appendTo( "#content" );
            allContents[i].content.loaded = true;
            loadNeed = false;
        }
    }

    if(loadNeed) {
        let temp = $(parent).load(path);
        allContents.push({
            name: name,
            content: new ContentElement(temp)
        })
    }
}

function  UnloadContent(contentToUnload){
    let temp = $("#content-main").detach();
    contentToUnload.content.loaded = false;
    contentToUnload.content.content = temp;
}

let allContents = []

class ContentElement{
    content = null;
    loaded = false;

    constructor(content) {
        this.content = content;
        this.loaded = true;
    }
}