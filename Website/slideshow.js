var delay = 8000;
var slideNumber = 0;
var slideCurrent = 5;

$(document).ready(function () {
    showSlides(slideNumber);
    $(".slideshow").css("height", $(".slides").height()); 
    interval();
});

$(window).resize(function () {
   $(".slideshow").css("height", $(".slides").height()); 
});

function nextSlide(n) {
    showSlides(slideNumber += n);
}

function activeSlide(n) {
    showSlides(slideNumber = n);
}

function interval () {
    var timer = setInterval(function(){nextSlide(1)}, delay);
}

function showSlides(n) {
    
    $(".slideshow").css("pointer-events", "none");
    
    var slides = $(".slides");
    var dots = $(".dots");

    if (slideNumber > slides.length-1) {
        slideNumber = 0;
    }    
    
    if (slideNumber < 0) {
        slideNumber = slides.length-1;
    }
    
    for (var i = 0; i < slides.length; i++) {
        if ($(slides[i]).css("z-index") == 3) {
            slideCurrent = i;
        }
    }
    
    $(slides[slideNumber]).css('z-index',2);
    
    $(slides[slideCurrent]).fadeOut(500,function(){
        $(this).css('z-index',1).show();
        $(slides[slideNumber]).css('z-index',3);
        $(".slideshow").css("pointer-events", "auto");
    });
    
    for (var i = 0; i < dots.length; i++) {
        $(dots[i]).removeClass("white");
    }
    
    $(dots[slideNumber]).addClass("white");

}