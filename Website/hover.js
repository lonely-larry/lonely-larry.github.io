/*-------------Hover--------------*/

$( "li.navBut" ).mouseenter(function() {    //Trigger the function when the button is hovered over
    
    if (!$(this).hasClass("active")) {   //If the button is not the active page play the animation
        $(this).animate({   //Animate the button to a height of 7vw and change the colour over 300ms

            height: "7vw",
            backgroundColor: "#2476C9"

        }, 300);
        
        $(this).find("a").animate({ //Animate the text on the button to lower it while the button expands, this keeps the text vertically centered.
            top: "1vw"
        }, 300)
    }

});

$( "li.navBut" ).mouseleave(function() {    //Does the opposite of the first function when the button is no longer hovered over.
    if (!$(this).hasClass("active")) {
        
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
            
$( ".svg" ).click(function() {  //When the menu button is clicked

    if ($(window).width() < 500) {  //Only open the menu if the device is 'mobile' sized
        
        $(".svg").css("pointer-events", "none");    //Disable user's clicks while animation plays
        
        $(".topRec, .botRec, .midRec").toggleClass("active");   //Add the class active if it doesn't have it, remove the class if it does.

        if(!$(".topRec, .botRec, .midRec").hasClass("active")){

            $(".topRec, .botRec, .midRec").addClass("inactive");    //If the class active is not there add inactive

        }else{
            $(".topRec, .botRec, .midRec").removeClass("inactive");     //If the class active is there remove the class inactive
        }
        
        if (!open){ 
            $(".sideBar").animate({ //If the menu is closed, animate the width to 40% over 500ms
                width: "40%"
            },500,function () {
                $(".svg").css("pointer-events", "auto");    //Enable user's click once animation completes
            });
            open = true;
        } else {
            $(".sideBar").animate({ //If the menu is open, animate the width to 0 over 500ms
                width: "0"
            },500,function () {
                $(".svg").css("pointer-events", "auto");    //Enable user's click once animation completes
            });
            open = false;
        }
    }
});

/*-------------CenterNav--------------*/

var totalWidth;
var barWidth = 0;
var leftMargin;

$(document).ready(function () {
    align();    //Runs align function once document has loaded
});

function align () {
    
    barWidth = 0;   //Resets barWidth
    
    $('li.navBut').each(function() {    //Runs an anonymous function for each Navigation button 
        barWidth += $(this).outerWidth();   //Finds the total width of each button and adds that value to barWidth
    });
    
    
    totalWidth = $("nav").width(); //Finds the total width of the whole nav bar
    
    
    leftMargin = (totalWidth - barWidth)/2; //Finds the size margin that needs to be applied to the bar    
    
    $(".navBar").css("margin-left", leftMargin + "px"); //Sets the margin-left to the value calculated earlier
    
}

$(window).resize(function() {
    align()    //Runs align function when the window is resized
});