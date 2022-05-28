const rest_container = document.getElementById("rest-container");
const nav_home = document.getElementById("home");

//when user clicks the home in header
nav_home.addEventListener("click", function(){
    window.location.href = "./explore.html"
})

//when user clicks the restaurant card
rest_container.addEventListener("click",function(){
    window.location.href = "../restaurant-page/restaurant.html";
})



