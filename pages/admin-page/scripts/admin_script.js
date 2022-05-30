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

//linking restaurants data and creating resto cards accordingly
axios({
    url: 'http://localhost/eatAt-backend/eatat-backend/users_list.php',
}).then(function(response){
    console.log(response.data);
    //looping over the array to get user data
    for(let i = 0; i < response.data.length; i++){
        let id = response.data[i]["id"];
        let first_name = response.data[i]["first_name"];
        let last_name = response.data[i]["last_name"];
        let email = response.data[i]["email"];
        createRow(id, first_name, last_name, email);
    }
})

function createRow(id, first_name, last_name, email){
    //creating div tag and inserting in ul
    const ul_div = document.createElement("div");
    const ul = document.getElementById("list");
    ul_div.id = id;
    ul_div.className = "row";
    ul.appendChild(ul_div);

    //creating li in the div
    var li = document.createElement("li");
    ul_div.appendChild(li);
    li.innerHTML = "id:" + id + "\tfull name:" + first_name + ' ' + last_name + "\temail:" + email;

    var div_child = document.createElement("div");
    div_child.className = "delete";
    ul_div.appendChild(div_child);
    div_child.innerHTML = "&#10060";
}