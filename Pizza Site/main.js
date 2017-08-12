//TODO put on github

window.onload = function () {
var pizzas, index, quant, orderString;

var currentOrder = [];

var prices, total, deliveryToggle;

const deliveryCost = 3;
    
const pizzaLimit = 5;

//Takes the data from the pizzaMenu.json file and creates li elements for each pizza

function pizzaToLi(pizza, i) {
    return "<li class='pizza' data-index='" + i + "'><a><div class='description'><h2>" + pizza.name + "</h2><p>" + pizza.description + "</p></div><img src='Resources/pizza" + i + ".png'></a></li>"
}

function checkoutPizzaToLi(pizza, i) {
    return "<li>" + pizza.quantity + " &times; " + pizzas[pizza.pizzaIndex].name + " - $" + (pizza.quantity * pizzas[pizza.pizzaIndex].cost).toFixed(2) + "</li>"
}

//Animates the popup window in or out of view

function togglePopup() {
    
    var popup = $(".popupContent").css("opacity");
    
    var totalHeight = $(window).height();
    
    var marginTop = "20vh";
    
    //If the popup is hidden animate it to be visible and slide it down the page
    
    if (popup == 0) {
        
        $(".popup").css("display", "block");
        
        var popupHeight = $(".popupContent").outerHeight();
        
        if ($(".popupContent").hasClass("checkout")) {
            marginTop = (totalHeight - popupHeight)/2 + "px";
            
        }
        
        $(".popupContent").animate({
            opacity: "1",
            marginTop: marginTop
        }, 400)
    }
    
    //If the popup is visible animate it to be hidden and slide it up out if view
    
    if (popup == 1) {
        $(".popupContent").animate({
            opacity: "0",
            marginTop: "0"
        }, 400, function(){
            $(".popup").css("display", "none");
        });
    }
}

function sideBar () {
    
    orderHeight();
    
    if( !$("h1").is(':animated') ) {
        
        $("article, .sideBar").toggleClass("active");

        if(!$("article, .sideBar").hasClass("active")){
            
            $("article, .sideBar").addClass("inactive");
            
            $("h1").animate({
                fontSize: "7vw"
            }, 500, "linear");
            
        }else{
            
            $("article, .sideBar").removeClass("inactive");     //If the class active is there remove the class inactive
            
            $("h1").animate({
                fontSize: "4.5vw"
            }, 500, "linear");
        }
    }
}

function createOrder (quantity, pizzaIndex, remove) {
    
    var pizza = currentOrder.find(orderItem => orderItem.pizzaIndex === index);

    total = 0;
    
    if (!remove) {
    
        // if the pizza is already in the order, we just want to increase the quantity
        if (pizza) {

            var singlePizzaQuantity = quantity;

            if (singlePizzaQuantity <= pizzaLimit && singlePizzaQuantity > 0) {
                pizza.quantity = singlePizzaQuantity; // Increase the quantity of the pizza if it's within the limits
            } 
        }
        // else let's add it to the array
        else {
            currentOrder.push({
                pizzaIndex: pizzaIndex,
                quantity: quant
            });
        }    
    } else {
        console.log(pizzaIndex);
        
        currentOrder = currentOrder.filter(x => x.pizzaIndex !== pizzaIndex);
    }
        
    orderString = "";
    
    currentOrder.forEach(function(i) {
        
        total += pizzas[i.pizzaIndex].cost*i.quantity;
        
        orderString += "<li class='item' data-index='" + i.pizzaIndex + "'><div class='image'><img src='Resources/pizza" + i.pizzaIndex + ".png'/></div><div class='pizzaName'><span>" + pizzas[i.pizzaIndex].name + "</span></div><span class='quantity'><button class='plusBtn' type='button' name='button'><span class='plus'>+</span></button><p>" + i.quantity + "</p><button class='minusBtn' type='button' name='button'><span class='minus'>-</span></button></span><div class='total-price'>$" + ((pizzas[i.pizzaIndex].cost*i.quantity).toFixed(2)) + "</div><div class='buttons'><span class='deleteBtn'><img src='Resources/rubbish-bin.svg'></span></div></li>"
        
    });
    
    $(".shoppingCart").html(orderString);
    
    var strTotal = "Total: $" + total.toFixed(2);
    
    $(".total").text(strTotal);
    
    //$(".error").css("display", "none");
    
}

function orderHeight () {
    
    var totalHeight = $(window).height();
    
    var cartHeight = totalHeight - $(".fixedBox").outerHeight();
    
    $(".cart").css("height", cartHeight + "px");
}

//Function runs whenever the postcode input is changed

function checkPostcode () {
    
    //Finds the value of the postcode field
    var input = $(".postcode").val();
    
    //Replaces any non-numeric characters with nothing, then update the input field
    input = input.replace(/\D/g,'');
    $(".postcode").val(input);
    
}

function updateTotals () {
    //Create an array of strings for each pizza li element
    var liElements = currentOrder.map(checkoutPizzaToLi).join("");
    
    if (deliveryToggle) {
        liElements = liElements + "<li>Delivery fee - $" + deliveryCost.toFixed(2) + "</li><li>Total - $" + (total + deliveryCost).toFixed(2) + "</li>";
    } else {
        liElements = liElements + "<li>Total - $" + total.toFixed(2) + "</li>";
    }
    
    //Join each li in the array into a long string and add it to the document
    $("ul.orderedPizzas").html(liElements);
}

//Get the json file and create the pizza grid

$.get("Resources/pizzaMenu.json", function(data) {
    pizzas = data.pizzaMenu; // jquery automatically parses it to a pure javascript object
    
    prices = data.prices;
    
    pizzas.forEach(function(i) {
        i.cost = prices[i.type];
    });
    
    //Create an array of strings for each pizza li element
    var liElements = pizzas.map(pizzaToLi);
    
    //Join each li in the array into a long string and add it to the document
    $("ul.pizza").html(liElements.join(""));
      
});

//When a pizza is clicked create a popup box and show that popup box


$("ul.pizza").delegate("li", "click", function () {
    index = $(this).attr("data-index"); //Finds which pizza was chosen
    
    var pizza = currentOrder.find(orderItem => orderItem.pizzaIndex === index);
    
    if (pizza) {
        quant = pizza.quantity;
    } else {
        quant = 1;
    }
    
    //Creates a popup box for that pizza with the relevant data
    
    $(".popup").html("<div class='popupContent addPizza'><span class='exit'>&times;</span><h2>" + pizzas[index].name + "</h2><h3>Total: $" + ((pizzas[index].cost*quant).toFixed(2)) + "</h3><p class='quantLabel'>Quantity:</p><span class='quantityPopup'><button class='minusBtn' type='button' name='button'><span class='minus'>-</span></button><p class='quantVal'>" + quant + "</p><button class='plusBtn' type='button' name='button'><span class='plus'>+</span></button></span><button class='addOrder mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>Add to order</button></div>"); 
    
    //Display the popup box
    
    togglePopup(); 
});

//If the 'add to order' button inside the popup is clicked hide the popup, create the item and add it to the shopping cart and show the shopping cart.

$(".popup").delegate("button.addOrder", "click", function() {
    
    createOrder(quant, index, false);
    
    togglePopup();
    
    //If the sidebar isn't already open, open it
    if (!$(".sideBar").hasClass("active")) {
        sideBar();
    }
});

$(".popup").delegate("button.yes", "click", function() {
    
    togglePopup();
    sideBar();
    
    currentOrder = [];
    
    debugger;
});

$(".popup").delegate("button.no", "click", function() {
    
    togglePopup();
    
});

$(".cancel").click(function() {
    $(".popup").html("<div class='popupContent cancelScreen'><span class='exit'>&times;</span><h2>Are you sure you want to cancel?</h2><button class='yes mdl-button mdl-js-button mdl-button--raised'>Yes</button><button class='no mdl-button mdl-js-button mdl-button--raised'>No</button></div>");
    
    togglePopup();
});

$(".order").click(function() {
    var totalPizzas = 0;
    
    currentOrder.forEach(function(i) {
        totalPizzas += i.quantity;
    });
    
    if (totalPizzas <= pizzaLimit) {
        
        $(".popup").html("<div class='popupContent checkout'><span class='content'><span class='exit'>&times;</span><h2>Please enter your details.</h2><form><input class='field' type='text' name='fname' placeholder='First name'><br><input class='field' type='text' name='lname' placeholder='Last name'><br><input class='field' type='tel' placeholder='Phone Number'><br></form><div class='totals'><ul class='orderedPizzas'></ul></div><div class='switch'><input id='cmn-toggle-7' class='cmn-toggle cmn-toggle-yes-no toggleSwitch' type='checkbox'><label for='cmn-toggle-7' class='labelToggle' data-on='Delivery' data-off='Pickup'></label></div><span class='buttons'><button class='confirm mdl-button--colored mdl-button mdl-js-button mdl-button--raised'>Confirm details</button><button class='cancelDetails mdl-button mdl-js-button mdl-button--raised'>Cancel</button></span><div class='delivery'><form><input class='field address' type='text' name='address' placeholder='Address'><br><input class='field postcode' type='text' maxlength='4' oninput='checkPostcode()' name='postcode' placeholder='Postcode'></form></div></span></div>");
        
        updateTotals();
        
        togglePopup();
    } else {
        $(".popup").html(`<div class='popupContent cancelScreen'><span class='exit'>&times;</span><h3 class='limit'>Sorry, we have a ${pizzaLimit} pizza limit. Please remove some pizzas from your order. Contact us about our catering services if you want a larger order.</h3></div>`);
        
        togglePopup();
    }
    
})

$(".popup").delegate(".confirm", "click", function() {
    debugger;
});

/*$(".popup").delegate("#quantity", "change", function () {
    
    quant = $("#quantity").val();
    
    if ($(".error").css("display") == "block") {
        $(".error").css("display", "none");
    }
    
    if (quant <= 0 || quant > 12) {
        $("#quantity").val("1");
        quant = 1;
        $(".error").css("display", "block");

    }
    
    $(".popupContent h3").html("Total: $" + ((pizzas[index].cost*quant).toFixed(2)) ); 
});*/

$(".popup").delegate('.exit','click',function() {
    togglePopup();
    
    deliveryToggle = false;
});

$(".popup").delegate(".plusBtn", "click", function() {
    //When the plus quantity button is pressed increase the quantity if it's within the accepted values.
    if (quant < pizzaLimit) {
        quant++;
        $(".quantVal").html(quant);
        //Re-render a updated total cost
        $(".popupContent h3").html("Total: $" + ((pizzas[index].cost*quant).toFixed(2)) ); 
    }
});

$(".popup").delegate(".minusBtn", "click", function() {
    //When the minus quantity button is pressed decrease the quantity if it's within the accepted values.
    if (quant > 1) {
        quant--;
        $(".quantVal").html(quant);
        //Re-render a updated total cost
        $(".popupContent h3").html("Total: $" + ((pizzas[index].cost*quant).toFixed(2)) );   
    }
});
      
$(".shoppingCart").delegate(".plusBtn", "click", function() {
    index = $(this).parents("li.item").attr("data-index");
    
    var pizza = currentOrder.find(orderItem => orderItem.pizzaIndex === index);
    
    var quantity = +pizza.quantity + 1;
    
    createOrder(quantity, index, false);
});

$(".shoppingCart").delegate(".minusBtn", "click", function() {
    index = $(this).parents("li.item").attr("data-index");
    
    var pizza = currentOrder.find(orderItem => orderItem.pizzaIndex === index);
    
    var quantity = +pizza.quantity + -1;
    
    createOrder(quantity, index, false);
});

$(".shoppingCart").delegate(".deleteBtn", "click", function() {
    index = $(this).parents("li.item").attr("data-index");
    
    createOrder(0, index, true);
});

$(window).resize(function() {
    orderHeight();
});

$(".popup").delegate(".toggleSwitch", "click", function() {
    deliveryToggle = $(this)[0].checked;
    
    updateTotals();
    
    if (deliveryToggle) {
        $(".delivery").css("display", "block");
    } else {
        $(".delivery").css("display", "none");
    }
});

}