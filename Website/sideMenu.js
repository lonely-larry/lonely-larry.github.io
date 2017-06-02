var open = false;
            
$( ".svg" ).click(function() {
    if (open == false) {
        console.log("test");
        $(".cross").each(function (){
            this.beginElement();
        });
        if ($(window).width() < 500){
            $(".sideBar").animate({
                width: "40%"
            },500);
        }
        open = true;
    } else {
        $(".menuLines").each(function (){
            this.beginElement();
        });
        if ($(window).width() < 500){
            $(".sideBar").animate({
                width: "0"
            },500);
        }
        open = false;
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