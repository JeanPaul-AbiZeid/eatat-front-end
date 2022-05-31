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

id = localStorage.getItem("id");
var api_profile = 'http://localhost/eatAt-backend/eatat-backend/user-info.php'
var url_id = api_profile + '?id=' + id;

//linking user data and creating user profile accordingly
axios({
    url: url_id,
}).then(function(response){
    console.log(response.data);
    // //looping over the array to get user data
    
    let first_name = response.data["first_name"];
    let last_name = response.data["last_name"];
    // let picture = response.data[i]["picture"];
    changeProfile(first_name, last_name); //add parameter picture
})

function changeProfile(first_name, last_name){ //add parameter picture
    //profile
    //creating div tag and inserting in ul
    const full_name = document.getElementById("full-name");
    full_name.innerHTML = first_name + " " + last_name;
}