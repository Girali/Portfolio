UpdateSubItems(subSectionIndex);
function UpdateSubItems(sectionIndex){
    subSectionIndex = sectionIndex;
    $(".menu-sub-item").each(function(i, element) {
        if(i == subSectionIndex){
            SortItems(sortKeys[i]);
            $(element).addClass("active-sub");
        }
        else{
            $(element).removeClass("active-sub");
        }
    });
}

function SortItems(key){
    $("#content-main").detach();
    allContents[currentActiveSectionContent].content.content.appendTo("#content");
    if (key != "all") {
        $(".content-box").each(function (i, element) {
            if ($(element).attr('content-type') != key) {
                $(element).remove();
            }
        })
    }
}