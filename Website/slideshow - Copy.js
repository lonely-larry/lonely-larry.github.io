var delay = 5000;
var slideNumber = 0;

$(document).ready(function () {
    showSlides(slideNumber += 1);
    interval();
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
    
    var slides = $(".slides");
    var dots = $(".dots");
    var i;

    if (n > slides.length) {
        slideNumber = 1;
    }    
    
    if (n < 1) {
        slideNumber = slides.length;
    }
    
    for (i = 0; i < slides.length; i++) {
        $(slides[i]).css("display", "none");
    }
    
    for (i = 0; i < dots.length; i++) {
        $(dots[i]).removeClass("white");
    }

    $(slides[slideNumber-1]).css("display", "block");
    
    $(dots[slideNumber-1]).addClass("white");

}