/*-------------Hover--------------*/

$( "li.navBut" ).mouseenter(function() {
    
    
    if ($(this).hasClass("active")) {

    } else {
        $(this).animate({

            height: "7vw",
            backgroundColor: "#2476C9"

        }, 300);
        
        $(this).find("a").animate({
            top: "1vw"
        }, 300)
    }
    

});

$( "li.navBut" ).mouseleave(function() {
    
    if ($(this).hasClass("active")) {
        
    } else {
        
        $(this).animate({
            height: "5vw",
            backgroundColor: "#101D23"
        }, 300);
        
        $(this).find("a").animate({
            top: "0"
        }, 300)
    
    }
    
    
});

/*-------------SideMenu--------------*/

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

/*-------------CenterNav--------------*/

var totalWidth;
var barWidth = 0;
var leftMargin;

$(document).ready(function () {
    align();
});

function align () {
    
    barWidth = 0;
    
    $('li.navBut').each(function() {
        barWidth += $(this).outerWidth();
    });
    
    
    totalWidth = $("nav").width();
    
    
    leftMargin = (totalWidth - barWidth)/2;
    
    $(".navBar").css("margin-left", leftMargin + "px");
    
}

$(window).resize(function() {
    align()
});