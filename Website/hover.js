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