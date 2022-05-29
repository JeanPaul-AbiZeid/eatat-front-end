// Get the modal
var modal = document.getElementById("myModal");

// Buttons
var add_rest_btn = document.getElementById("add-rest");
var monitor_btn = document.getElementById("monitor");
var logout_btn = document.getElementById("logout");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

// When the user clicks the add restaurant button, open the modal 
add_rest_btn.addEventListener("click", function(){
modal.style.display = "block";})

// When the user clicks on <span> (x), close the modal
span[0].addEventListener("click", function(){
modal.style.display = "none";})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}

//when the user clicks on monitor reviews
monitor_btn.addEventListener("click",function(){
window.location.href = "../reviews-page/reviews.html";
})

//when the user clicks on logout
logout_btn.addEventListener("click",function(){
window.location.href = "../../index.html";
})