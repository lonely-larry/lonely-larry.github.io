var vidHeight, boxHeight, boxTop, padding, header, boxWidth, h2Size, h3Size;

function center() {
    vidHeight = $(".timelapse").height();
    padding = vidHeight * 0.04 + "px 0";
    header = $("header").height()
    boxTop = vidHeight * 0.36 + header + "px";
    
    $(".overlay").css("padding", padding);
    $(".overlay").css("top", boxTop);
    
    if ($(document).width() * 0.067 -5.33 >= 80) {
        h2Size = 80;
        h3Size = 40;
    } else {
        h2Size = $(document).width() * 0.068 - 5.33;
        h3Size = $(document).width() * 0.028 + 4.44;
    }
    
     if ($(document).width() < 1000) {
        boxWidth = 77;
    } else if($(document).width() > 2560) { 
        boxWidth = 35;
    } else {
        boxWidth = $(document).width() * -0.03 + 110;
    }   

    if ($(document).width() > 1266) {
        boxHeight = "160px";
    } else {
        boxHeight = vidHeight * 0.2 + "px";
    } 
    
    $(".overlay").css("width", boxWidth + "%");
    
    $(".overlay").css("height", boxHeight);
    
    $("h2").css("font-size", h2Size + "px")
    
    $("h3").css("font-size", h3Size + "px")
    
    $("header").css("height", $(".logo").height()/2 + "px");
    
    $(".timelapse").css("top", $(".logo").height()/2);

    
    /*if (vidHeight < $(document).height()) {
            $("header").css("height", header);       
        } else {
            $("header").css("margin_bottom", "-50px")
        }*/
}

//window.onload = center();



$(document).ready(function(){
    center();
    setTimeout(center, 50);
});

$(window).resize(center);
