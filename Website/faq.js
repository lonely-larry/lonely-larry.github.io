var answer;

$(".quest").click(function () {
    
    answer = $(this).find(".answer");
    $(answer).slideToggle(250);
    
});

