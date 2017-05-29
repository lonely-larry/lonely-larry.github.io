function showMenu () {
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
}