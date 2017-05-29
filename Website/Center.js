var totalWidth;
var barWidth = 0;
var leftMargin;
var x = 0;

var rtime;
var timeout = false;
var delta = 200;

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


/*$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        align();
    }               
}*/