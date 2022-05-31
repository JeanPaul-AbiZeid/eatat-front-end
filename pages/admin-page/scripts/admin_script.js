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
    const div_class = ul_div.classList; 
    div_class.add(id);
    div_class.add("row");
    ul.appendChild(ul_div);

    //creating li in the div
    var li = document.createElement("li");
    ul_div.appendChild(li);
    li.innerHTML = "id:" + id + "\tfull name:" + first_name + ' ' + last_name + "\temail:" + email;

    var div_child = document.createElement("div");
    const div_child_class = div_child.classList; 
    div_child_class.add(id);
    div_child_class.add("delete");
    ul_div.appendChild(div_child);
    div_child.innerHTML = "&#10060";
}

const add_restaurant_btn = document.getElementById("add");

//function when adding restaurant 
let addRestaurant= (e) =>{
    e.preventDefault();
    let data = new FormData();
  
    data.append('name', document.getElementById("rest_name").value);
    data.append('location', document.getElementById("location").value);
    data.append('avg_cost', document.getElementById("avg_cost").value);
    data.append('category', document.getElementById("category").value);
    // data.append('image', document.getElementById("image").value);
    data.append('description', document.getElementById("rest_description").value);
  
    //linking with add-restaurant api
    axios({
      method: 'post',
      url: 'http://localhost/eatAt-backend/eatat-backend/add-restaurant.php',
      data: data,
    })
    .then(function (response) {
      //check if the restaurant exists
      if(response.data["success"]){
        alert("restaurant added");
        document.getElementById("rest_name").value = "";
        document.getElementById("location").value = "";
        document.getElementById("avg_cost").value = "";
        document.getElementById("category").value = "";
        // data.append('image', document.getElementById("image").value);
        document.getElementById("rest_description").value = "";
      }else{
        alert(response.data["response"]); //restaurant already exists
        document.getElementById("rest_name").value = "";
        document.getElementById("location").value = "";
        document.getElementById("avg_cost").value = "";
        document.getElementById("category").value = "";
        // data.append('image', document.getElementById("image").value);
        document.getElementById("rest_description").value = "";
      }
    })
    .catch(function (error){
      console.log(error);
    })
  }
  add_restaurant_btn.addEventListener('click', addRestaurant);
