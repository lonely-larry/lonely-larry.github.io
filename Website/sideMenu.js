var open = false;
            
$( ".svg" ).click(function() {

    if ($(window).width() < 500) {
        
        $(".topRec, .botRec, .midRec").toggleClass("active");

        if(!$(".topRec, .botRec, .midRec").hasClass("active")){

            $(".topRec, .botRec, .midRec").addClass("inactive");

        }else{
            $(".topRec, .botRec, .midRec").removeClass("inactive");
        }
        
        if (!open){
            $(".sideBar").animate({
                width: "40%"
            },500);
            open = true;
        } else {
            $(".sideBar").animate({
                width: "0"
            },500);
            open = false;
        }
    }
});

/*function showMenu () {
    if ($(window).width() < 500){
        $(".sideBar").animate({
            width: "40%"
        },300);
    }
}

function hideMenu () {
    if ($(window).width() < 500){
        $(".sideBar").animate({
            width: "0"
        },300);
    }
}*/