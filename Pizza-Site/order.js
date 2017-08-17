var currentOrder, liOrders;

var index;

var order = localStorage.getItem("order");

var userDetails = localStorage.getItem("userDetails");

var allOrders = localStorage.getItem("allOrders");

//If the allOrders array is not already in local storage create a new array
if (!allOrders) {
    allOrders = [];
} else {
    //If the allOrders array is in the local storage parse it into a javascript object
    allOrders = JSON.parse(allOrders);
}

//Checks that both order and user details exist and are real
//This is needed as the user can load the page without having a order, if the code were to continue with undefined values it would cause errors
if (order != "undefined" && userDetails != "undefined" && order && userDetails) {
    
    //If the files exist parse them into javascript objects   
    order = JSON.parse(order);
    userDetails = JSON.parse(userDetails);
    
    //Add the variables to the allOrders array
    allOrders.push({
        order: order,
        userDetails: userDetails
    });
}

//Loop that creates an Li element for each pizza in the order
//A loop was used as each li is the same structure just with different pizzas
function orderPizzaToLi(pizza,i) {
    return `<li class="pizza">${currentOrder[i].quantity} &times; ${currentOrder[i].pizzaName} - $${(currentOrder[i].quantity * currentOrder[i].cost).toFixed(2)}</li>`
}

function printOrders(liOrder,i) {

    //Find the current order and current user details out of the order array
    
    currentOrder = allOrders[i].order;
    
    var currentUserDetails = allOrders[i].userDetails;
    
    //Find whether the order is delivery or pickup and set orderType accordingly 
    
    var orderType = currentUserDetails.delivery ? "Delivery" : "Pickup";
    
    //Creates a string of li elements for each of the pizzas in the order
    
    var liElements = currentOrder.map(orderPizzaToLi).join("");
    
    //Calculate the total cost of all the pizzas
    
    totalCost = 0;

    $(currentOrder).each(function() {
        totalCost += this.quantity * this.cost;
    });

    //Create a string of HTML elements with the total cost calculated earlier
    
    if (currentUserDetails.delivery) {
        liElements = liElements + `<li class="deliveryFee pizza">Delivery fee - $${currentUserDetails.deliveryCost.toFixed(2)}</li><li class="total pizza">Total - $${(totalCost + currentUserDetails.deliveryCost).toFixed(2)}<li>`
    } else {
        liElements = liElements + `<li class="total pizza">Total - $${totalCost.toFixed(2)}<li>`
    }

    //Create a string with the li element for the order with different information based on whether it's pickup or delivery

    if (currentUserDetails.delivery) {

        return `<li class="order" data-index="${i}">
                        <span class="content">
                            <h2>Order ${i + 1} - ${orderType}</h2>
                            <ul class="pizzas">
                                ${liElements}
                            </ul>
                            <ul class="userDetails">
                                <li class="fname">First Name: ${currentUserDetails.fname}</li>
                                <li class="lname">Last Name: ${currentUserDetails.lname}</li>
                                <li class="email">Email: ${userDetails.email}</li>
                                <li class="pnumber">Phone number: ${currentUserDetails.phone}</li>
                                <li class="address">Address: ${currentUserDetails.address}</li>
                                <li class="postcode">Postcode: ${currentUserDetails.postcode}</li>
                                <li class="postcode">Time order placed: ${currentUserDetails.date}</li>
                            </ul>
                            <img class="${orderType}" src='Resources/rubbish-bin.svg'>
                        </span>
                    </li>`;

    } else {
        return `<li class="order" data-index="${i}">
                            <span class="content">
                                <h2>Order ${i + 1} - ${orderType}</h2>
                                <ul class="pizzas">
                                    ${liElements}
                                </ul>
                                <ul class="userDetails">
                                    <li class="fname">First Name: ${currentUserDetails.fname}</li>
                                    <li class="lname">Last Name: ${currentUserDetails.lname}</li>
                                    <li class="email">Email: ${currentUserDetails.email}</li>
                                    <li class="pnumber">Phone number: ${currentUserDetails.phone}</li>
                                    <li class="postcode">Time order placed: ${currentUserDetails.date}</li>
                                </ul>
                                <img class="${orderType}" src='Resources/rubbish-bin.svg'>
                            </span>
                        </li>`;    
    }

}

//Animates the popup window in or out of view

function togglePopup() {
    
    var popup = $(".popupContent").css("opacity");
    
    
    //If the popup is hidden animate it to be visible and slide it down the page
    
    if (popup == 0) {
        
        $(".popup").css("display", "block");
        
        $(".popupContent").animate({
            opacity: "1",
            marginTop: "20vh"
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

$(".addOrder").click(function() {
    
    //When the user clicks the 'Add another order' button save the information about all of the orders to the local storage
    
    localStorage.setItem("allOrders", JSON.stringify(allOrders));
    
    //Remove the outdated local storage files to prepare for the next order
    
    localStorage.removeItem("order");
    
    localStorage.removeItem("userDetails");
    
    //Navigate to the main page
    
    window.location = 'index.html';
});


//If the user clicks the 'Cancel all orders' button display a confirmation popup
$(".cancelOrders").click(function() {
    
    $(".popup").html("<div class='popupContent cancelScreen'><span class='exit'>&times;</span><h2>Are you sure you want to cancel all orders?</h2><button class='yes'>Yes</button><button class='no'>No</button></div>");
    
    togglePopup();
});


//If the user confirms that they wish to cancel the orders clear the local storage to remove any orders and navigate to the main page
$(".popup").delegate("button.yes", "click", function() {
    localStorage.clear();
    window.location = 'index.html';
});


//When the user clicks the no button on a popup, close the popup
$(".popup").delegate("button.no", "click",togglePopup);

//When the user clicks the exit button on the popup, close the popup
$(".popup").delegate(".exit", "click", togglePopup);


//When the user presses the delete button find which order they pressed and create a confirmation popup box
$("html").delegate("img", "click", function() {
    
        
    index = $(this).parents("li.order").attr("data-index");
    
    $(".popup").html("<div class='popupContent cancelScreen'><span class='exit'>&times;</span><h2>Are you sure you want to delete this order?</h2><button class='deleteOrder'>Yes</button><button class='no'>No</button></div>");
    
    togglePopup();
    
});


//When the user confirms that they want to delete the order, remove it.
$(".popup").delegate(".deleteOrder", "click", function() {
    
    //Removes the order that was clicked from the array and update the local files
    
    allOrders.splice(index, 1);
    
    localStorage.setItem("allOrders", JSON.stringify(allOrders));
    
    localStorage.removeItem("order");
    
    localStorage.removeItem("userDetails");
    
    //Update the order screen with the new changes
    
    liOrders = allOrders.map(printOrders).join("");

    $(".orderul").html(liOrders);
    
    togglePopup();
    
});

//Create a string of li elements for each order in the array
//A loop was used in this way as each order is the same li element, just with different data
liOrders = allOrders.map(printOrders).join("");

//Print this string to the order menu
$(".orderul").html(liOrders);