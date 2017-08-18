window.onload = function () {
var pizzas, index, quant, orderString;

var currentOrder = [];

var prices, total, deliveryToggle;

var deliveryCost, pizzaLimit;

//Takes the data from the pizzaMenu.json file and creates li elements for each pizza

function pizzaToLi(pizza, i) {
    return `<li class='pizza' data-index='${i}'><a><div class='description'><h2>${pizza.name}</h2><p>${pizza.description}</p></div><img src='Resources/pizza${i}.png'></a></li>`
}

//Creates li elements for each of the pizzas to be used in the checkout order box    

function checkoutPizzaToLi(pizza, i) {
    return `<li>${pizza.quantity} &times; ${pizza.pizzaName} - $${ (pizza.quantity * pizza.cost).toFixed(2)}</li>`
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

function centerPopup() {
    
    //Center the checkout popup inside the page
    
    if ($(".popupContent").hasClass("checkout")) {
        
        var totalHeight = $(window).height();

        var popupHeight = $(".popupContent").outerHeight();
        
        var marginTop = (totalHeight - popupHeight)/2 + "px";
        
        $(".popupContent").css("marginTop", marginTop);

    }
    
}

//Controls the sidebar animation
    
function sideBar () {
    
    orderHeight();
    
    //Controls the animation of the sidebar
    
    $("article, .sideBar").toggleClass("active");

    if(!$("article, .sideBar").hasClass("active")){

        $("article, .sideBar").addClass("inactive");

        $("h1").animate({
            fontSize: "7vw"
        }, 500, "linear");

        $("ul.pizza").animate({
            paddingLeft: "5vw"
        }, 500, "linear");

         $("footer button").animate({
            marginLeft: "40vw"
        }, 500, "linear");           
    } else {

        $("article, .sideBar").removeClass("inactive");

        $("h1").animate({
            fontSize: "4.5vw"
        }, 500, "linear");

        $("ul.pizza").animate({
            paddingLeft: "0"
        }, 500, "linear");

        $("footer button").animate({
            marginLeft: "24.375vw"
        }, 500, "linear");
    }

}

//Displays the current order in the order panel, this is a function as this code needs to run whenever the order is changed    

function createOrder (quantity, pizzaIndex, remove) {
    
    var pizza = currentOrder.find(orderItem => orderItem.pizzaIndex === index);

    total = 0;
    
    if (!remove) {
    
        //If the pizza is already in the order, we just want to change the quantity
        if (pizza) {

            var singlePizzaQuantity = quantity;

            if (singlePizzaQuantity <= pizzaLimit && singlePizzaQuantity > 0) {
                pizza.quantity = singlePizzaQuantity; //Change the quantity of the pizza if it's within the limits
            } 
        }
        //else let's add it to the array
        //An array is used so that the data of what items are in the order is easily accessible and used
        else {
            currentOrder.push({
                pizzaIndex: pizzaIndex,
                quantity: quant,
                pizzaName: pizzas[pizzaIndex].name,
                cost: pizzas[pizzaIndex].cost
            });
        }    
    } else {
        //If the pizza is to be removed from the order, remove it from the array
        currentOrder = currentOrder.filter(x => x.pizzaIndex !== pizzaIndex);
    }
    
    //Create a string containg the HTML elements for each pizza in the order and calculate the total cost of the order
    //This is a loop as all the li elements are the same apart from the pizza information
    
    orderString = "";
    
    currentOrder.forEach(function(i) {
        
        total += pizzas[i.pizzaIndex].cost*i.quantity;
        
        orderString += `<li class='item' data-index='${i.pizzaIndex}'><div class='image'><img src='Resources/pizza${i.pizzaIndex}.png'/></div><div class='pizzaName'><span>${i.pizzaName}</span></div><span class='quantity'><button class='plusBtn' type='button' name='button'><span class='plus'>+</span></button><p>${i.quantity}</p><button class='minusBtn' type='button' name='button'><span class='minus'>-</span></button></span><div class='total-price'>$${((i.cost*i.quantity).toFixed(2))}</div><div class='buttons'><span class='deleteBtn'><img src='Resources/rubbish-bin.svg'></span></div></li>`
        
    });
    
    //Add this string to the webpage to update the order panel
    
    $(".shoppingCart").html(orderString);
    
    //Update the total 
    
    var strTotal = "Total: $" + total.toFixed(2);
    
    $(".total").text(strTotal);
    
}

//Updates the height of the order cart based on the height of the window
    
function orderHeight() {
    
    var totalHeight = $(window).height();
    
    var cartHeight = totalHeight - $(".fixedBox").outerHeight();
    
    $(".cart").css("height", cartHeight + "px");
}

//Function runs whenever the postcode input is changed
//This is a funcrion as it is called whenever the postcode input is checked, which happens multiple times

function checkPostcode() {
    //Finds the value of the postcode field
    var input = $(".postcode").val();
    
    //Replaces any non-numeric characters with nothing, then update the input field
    input = input.replace(/\D/g,'');
    $(".postcode").val(input);
    
}

function updateTotals() {
    //Create an array of strings for each pizza li element to show which pizzas are currently in the order
    var liElements = currentOrder.map(checkoutPizzaToLi).join("");
    
    if (deliveryToggle) {
        liElements = liElements + `<li>Delivery fee - $${deliveryCost.toFixed(2)}</li><li>Total - $${(total + deliveryCost).toFixed(2)}</li>`;
    } else {
        liElements = liElements + `<li>Total - $${total.toFixed(2)}</li>`;
    }
    
    //Join each li in the array into a long string and add it to the checkout popup
    $("ul.orderedPizzas").html(liElements);
}

//Check that the email is valid, return the validity of the email
function emailValidation(email) {
    var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (email.length < 6 || email.length > 30) {
        return false;
    }
    
    return emailTest.test(email);
}
    
//Check that the phone number is valid, return the validity of the phone number
function phoneValidation(phone) {
    phone = phone.replace(/[\.+() ,:-]+/g, "");
    
    if (phone.length > 12 || phone.length < 7) {
        return false;
    }
    
    var phoneTest = /^\d+$/;
    return phoneTest.test(phone);
}

//Check that the name is valid, return the validity of the name
function nameValidation(name) {
    
    if (name.length > 15 || name.length < 2) {
        return false;
    }
    
    var nameTest = /^[a-zA-Z'- ]+$/;
    return nameTest.test(name);
}
    
//Check that the address is valid, return the validity of the address
function addressValidation(address) {
    var addressTest = /^[a-zA-Z ]*[1-9]+[a-zA-Z1-9\,\. ]+$/;
    
    if (address.length < 6) {
        return false;
    }
    
    return addressTest.test(address);
}    

//Get the json file and create the pizza grid

$.get("Resources/pizzaMenu.json", function(data) {
    
    //Find the relevant data from the json file and assign it to variables
    pizzas = data.pizzaMenu;
    
    prices = data.prices;
    
    deliveryCost = data.constants.deliveryCost;
    
    pizzaLimit = data.constants.pizzaLimit;
    
    
    //For each pizza set the cost based off the type of pizza and the constants for the price of that type
    pizzas.forEach(function(i) {
        i.cost = prices[i.type];
    });
    
    //Create an array of strings for each pizza li element
    var liElements = pizzas.map(pizzaToLi);
    
    //Join each li in the array into a long string and add it to the document
    $("ul.pizza").html(liElements.join(""));
      
});

$("ul.pizza").delegate("li", "click", function () {
    
    //When a pizza in the grid is clicked find which pizza was clicked and store it
    
    index = $(this).attr("data-index"); 
    
    var pizza = currentOrder.find(orderItem => orderItem.pizzaIndex === index);
    
    //If the selected pizza is already in the order increase the quantity. If it isn't add it to the order
    
    if (pizza) {
        quant = pizza.quantity + 1;
    } else {
        quant = 1;
    }
    
    //Create the order with the data gathered so far
    
    createOrder(quant, index, false);
    
    //If the sidebar isn't already open, open it
    if (!$(".sideBar").hasClass("active")) {
        sideBar();
    }
});

//Reset the order if the user confirms

$(".popup").delegate("button.yes", "click", function() {
    
    togglePopup();
    sideBar();
    
    currentOrder = [];
});

//Close the popup if the user clicks 'no'    

$(".popup").delegate("button.no", "click", function() {
    
    togglePopup();
    
});

//Create a popup confirmation box to make sure the user wants to cancel the order
    
$(".cancel").click(function() {
    $(".popup").html("<div class='popupContent cancelScreen'><span class='exit'>&times;</span><h2>Are you sure you want to cancel?</h2><button class='yes'>Yes</button><button class='no'>No</button></div>");
    
    togglePopup();
});

//Create the checkout popup box when the checkout button is clicked  

$(".order").click(function() {
    
    //Count the total number of pizzas in the order
    
    var totalPizzas = 0;
    
    currentOrder.forEach(function(i) {
        totalPizzas += i.quantity;
    });
    
    if (totalPizzas <= pizzaLimit && totalPizzas > 0) {
        
        //If the total number of pizzas is less or equal to the limit create the checkout popup and show it
        
         $(".popup").html("<div class='popupContent checkout'><span class='content'><span class='exit'>&times;</span><h2>Please enter your details.</h2><form class='pickup'><input class='field fname' type='text' name='fname' maxLength='20' placeholder='First name'><div class='error'><p>Please enter a valid first name</p></div><input class='field lname' type='text' name='lname' maxLength='20' placeholder='Last name'><div class='error'><p>Please enter a valid last name</p></div><input class='field pnumber' type='tel' placeholder='Phone Number'><div class='error'><p>Please enter a valid phone number</p></div><input class='field email' type='text' placeholder='Email Address'><div class='error'><p>Please enter a valid email address</p></div></form><div class='totals'><ul class='orderedPizzas'></ul></div><div class='switch'><input id='cmn-toggle-7' class='cmn-toggle cmn-toggle-yes-no toggleSwitch' type='checkbox'><label for='cmn-toggle-7' class='labelToggle' data-on='Delivery' data-off='Pickup'></label></div><span class='buttons'><button class='confirm'>Confirm details</button><button class='cancelDetails'>Cancel</button></span><div class='delivery'><form><input class='field address' type='text' name='address' placeholder='Address'><div class='error'><p>Please enter a valid address</p></div><input class='field postcode' type='text' maxlength='4' name='postcode' placeholder='Postcode'><div class='error'><p>Postcode must contain 4 numbers</p></div></form></div></span></div>");
        
        updateTotals();
        
        togglePopup();
    } else if (totalPizzas == 0) {   
            //If there are no pizzas in the order show an error popup

            $(".popup").html(`<div class='popupContent cancelScreen'><span class='exit'>&times;</span><h3 class='limit'>Sorry, please add a pizza to your order before continuing.</h3></div>`);
            
    } else {
            //If the total number of pizzas exceeds the limit show an error popup

            $(".popup").html(`<div class='popupContent cancelScreen'><span class='exit'>&times;</span><h3 class='limit'>Sorry, we have a ${pizzaLimit} pizza limit. Please remove some pizzas from your order. Contact us about our catering services if you want a larger order.</h3></div>`);
    }
    
    //Display the popup
    togglePopup();
    
})

//When the order is confirmed, check the inputs are valid and continue to the order screen
    
$(".popup").delegate(".confirm", "click", function() {
    
    //Find the values of the inputs and assign them to variables
    var email = $(".email").val();
    var phone = $(".pnumber").val();
    var fname = $(".fname").val();
    var lname = $(".lname").val();
    var address = $(".address").val();
    var postcode = $(".postcode").val();

    //Checks whether the input is valid, shows the error if it's not valid
    
    $(".pickup .error:nth-of-type(1) p").css("display",
        !nameValidation(fname) ? "block" : "none"
    );
    
    $(".pickup .error:nth-of-type(2) p").css("display",
        !nameValidation(lname) ? "block" : "none"
    );
    
    $(".pickup .error:nth-of-type(3) p").css("display",
        !phoneValidation(phone) ? "block" : "none"
    );
    
    $(".pickup .error:nth-of-type(4) p").css("display",
        !emailValidation(email) ? "block" : "none"
    );
    
    if (deliveryToggle) {
        
        //If the order is for delivery check the delivery specific inputs for validity.
        
        $("form:not(.pickup) .error:nth-of-type(1) p").css("display",
            !addressValidation(address) ? "block" : "none"
        );

        $("form:not(.pickup) .error:nth-of-type(2) p").css("display",
            postcode.length < 4 ? "block" : "none"
        );
        
        //If there are no errors store all the order information in local storage and navigate to the order page
        
        if (phoneValidation(phone) && emailValidation(email) && postcode.length === 4 && addressValidation(address) && nameValidation(fname) && nameValidation(lname)) {
            var userDetails = {
                email: email,
                phone: $(".pnumber").val(),
                fname: fname,
                lname: lname,
                address: address,
                postcode: postcode,
                delivery: true,
                deliveryCost: deliveryCost,
                date: new Date().toLocaleString('en-nz')
            };
            
            localStorage.setItem("order", JSON.stringify(currentOrder));
            localStorage.setItem("userDetails", JSON.stringify(userDetails));

            window.location = 'order.html';

        }
    } else if (phoneValidation(phone) && emailValidation(email) && nameValidation(fname) && nameValidation(lname)) {
        
        //If the order is for pickup and there are no errors store all the order information in local storage and navigate to the order page
        var userDetails = {
            email: email,
            phone: $(".pnumber").val(),
            fname: fname,
            lname: lname,
            delivery: false,
            date: new Date().toLocaleString('en-nz')

        };

        localStorage.setItem("order", JSON.stringify(currentOrder));
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        window.location = 'order.html';
        
    }

});

//When the 'see current order' button is pressed navigate to the orders page

$(".activeOrders").click(function() {
    window.location = 'order.html';
});

    
//When the exit button is pressed on a popup window close the popup and reset the delivery variable
    
$(".popup").delegate('.exit','click',function() {
    togglePopup();
    
    deliveryToggle = false;
});
    
//When the user cancels the checkout panel, close the window and reser the delivery variable

$(".popup").delegate('.cancelDetails', 'click', function() {
    togglePopup();
    
    deliveryToggle = false;   
});  
      
//When the plus button on the pizza is clicked increase the quantity    

$(".shoppingCart").delegate(".plusBtn", "click", function() {
    
    //Find which pizza is clicked
    
    index = $(this).parents("li.item").attr("data-index");
    
    var pizza = currentOrder.find(orderItem => orderItem.pizzaIndex === index);
    
    //Increase the quantity and add it to the order
    
    var quantity = +pizza.quantity + 1;
    
    createOrder(quantity, index, false);
});
    
//When the minus button on the pizza is clicked decrese the quantity

$(".shoppingCart").delegate(".minusBtn", "click", function() {
    
    //Find which pizza is clicked
    
    index = $(this).parents("li.item").attr("data-index");
    
    var pizza = currentOrder.find(orderItem => orderItem.pizzaIndex === index);
    
    //Decrease the quantity and add it to the order
    
    var quantity = +pizza.quantity + -1;
    
    createOrder(quantity, index, false);
});

//When the delete button on a pizza is clicked remove it from the order
    
$(".shoppingCart").delegate(".deleteBtn", "click", function() {
    index = $(this).parents("li.item").attr("data-index");
    
    createOrder(0, index, true);
});

//When the window is resized recenter the required content
    
$(window).resize(function() {
    orderHeight();
    centerPopup();
});
    
//Checks the postcode input for validity whenever it's changed
    
$("html").delegate(".postcode", "input", checkPostcode);

//Sets the deliveryToggle variable based on whether the switch is on pickup or delivery
    
$(".popup").delegate(".toggleSwitch", "click", function() {
    deliveryToggle = $(this)[0].checked;
    
    updateTotals();
    
    //Shows the input fields for address and postcode if the order is for delivery
    
    if (deliveryToggle) {
        $(".delivery").css("display", "block");
    } else {
        $(".delivery").css("display", "none");
    }
});

}
