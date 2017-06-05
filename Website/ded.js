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