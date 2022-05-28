const nav_home = document.getElementById("home");
const rest_container = document.getElementById("rest-container");

//when user clicks the home in header
nav_home.addEventListener("click", function(){
    window.location.href = "../../pages/explore-page/explore.html"
})

//when user clicks the restaurant card
rest_container.addEventListener("click",function(){
    window.location.href = "../restaurant-page/restaurant.html";
})