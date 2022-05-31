const nav_home = document.getElementById("home");

//creating url with resto id to send to restaurant php
let url = "http://localhost:8080/eatAt-backend/eatat-backend/restaurant.php";
let resto_id = localStorage.getItem("clicked_resto_id");
url += "?id=" + resto_id;

//creating url with resto id to send to restaurant-review api
let review_url = "http://localhost:8080/eatAt-backend/eatat-backend/restaurant-review.php";
review_url += "?restaurant_id=" + resto_id;

//creating url with resto id to send to restaurant-review api
let avg_rating_url = "http://localhost:8080/eatAt-backend/eatat-backend/avg-ratings.php";
avg_rating_url += "?restaurant_id=" + resto_id;

//linking resto page to restaurant api
axios({
    url: url,
}).then(function(response){
    result = response.data;
    //console.log(response.data); 
    //use resto data from db to fill up page
    let name = result.name;
    let location = result.location;
    let avg_cost = result.avg_cost;
    let category = result.category;
    let description = result.description;
    fillPage(name,location,avg_cost,category,description); 
}).catch(function (error){
    console.log(error);
})

//linking resto page to restaurant-review php to display the proper restaurant
axios({
    url: review_url,
}).then(function(response){
        //console.log(response.data); 
        //looping over the array to get review data
        for(let i=0; i<response.data.length; i++){
            let first = response.data[i]["first_name"];
            let last = response.data[i]["last_name"];
            let rating = response.data[i]["ratings"];
            let review = response.data[i]["review"];

            //creating review card of each review
            createReview(first,last,rating,review);
        }
}).catch(function (error){
    console.log(error);
    })

//linking add review php when user submits a review
let addReview = (e)=>{
    e.preventDefault();
    let data = new FormData();
  
    data.append('user_id', localStorage.getItem("id"));
    data.append('restaurant_id', localStorage.getItem("clicked_resto_id"));
    data.append('review', document.getElementById("review").value);
    data.append('ratings', checkedRating());

    //linking with add-review api
    axios({
      method: 'post',
      url: 'http://localhost:8080/eatAt-backend/eatat-backend/add-review.php',
      data: data,
    })
    .then(function (response) {
      //console.log(response.data);
      if(response.data["success"]){
        alert('Review added succesfully!');
      }
    })
    .catch(function (error){
      console.log(error);
    })
}

//linking to avg-ratings php to display avg rating and total ratings of restaurant
axios({
    url: avg_rating_url,
}).then(function(response){
    result = response.data;
    console.log(response.data); 
    //getting avg and total ratings of resto from db
    let avg = result["avg(ratings)"];
    let total = result["count(ratings)"];

    document.getElementById("avg-total").innerHTML = avg + " &#11088<br/>" + total + " ratings";
}).catch(function (error){
    console.log(error);
})


//linking to add favorites php when user clicks on add to favorites
let addFavorites = (e)=>{
    e.preventDefault();
    let data = new FormData();
  
    data.append('user_id', localStorage.getItem("id"));
    data.append('restaurant_id', localStorage.getItem("clicked_resto_id"));

    //linking with add-review api
    axios({
      method: 'post',
      url: 'http://localhost:8080/eatAt-backend/eatat-backend/add-favorites.php',
      data: data,
    })
    .then(function (response) {
      console.log(response.data);
      alert(response.data["response"]);
    })
    .catch(function (error){
      console.log(error);
    })
  }

//when user clicks on submit review
add_review_btn = document.getElementById("add-review-button");
add_review_btn.addEventListener('click',addReview);

//when user clicks on add to favorites
add_favorites_btn = document.getElementById("add");
add_favorites_btn.addEventListener('click',addFavorites);

//when user clicks the home in header
nav_home.addEventListener("click", function(){
    window.location.href = "../../pages/explore-page/explore.html"
})

function fillPage(name,loc,cost,category,description,image){
    //add resto info
    const info_div = document.getElementById("info");
    info_div.children[0].innerHTML = name;
    info_div.children[1].innerHTML = loc;
    info_div.children[2].innerHTML = cost;

    //TODO add avg ratings andtotal ratings

    //add desciption
    document.getElementById("description").innerHTML = description;

}

//function that returns the value of the selected radio button rating
function checkedRating(){
    const rating_radio = document.getElementsByName("rating-number");
    for(let i =0; i<rating_radio.length; i++){
        if(rating_radio[i].checked){
            return rating_radio[i].value;
        }
    }
}

function createReview(first_name,last_name,rating,review,image){

    //get resto card
    const resto_div = document.getElementById("resto");

    //create flex div for review card, and append to resto card
    const flex_div = document.createElement("div");
    flex_div.className = "confirm";
    resto_div.appendChild(flex_div);

    //create review card and append to flex_div
    const review_div = document.createElement("div");
    review_div.className = "card";
    flex_div.appendChild(review_div);

    //create user info div
    const user_info_div = document.createElement("div");
    user_info_div.className = "user-info";
    review_div.appendChild(user_info_div);

    //create div and its image
    const image_div = document.createElement("div");
    user_info_div.appendChild(image_div);

    const user_img = document.createElement("img");
    user_img.src = "./assets/eatat_icon.png"; //to be changed to user image
    image_div.appendChild(user_img);

    //create user stats div
    const stats_div = document.createElement("div");
    stats_div.className = "user-stats";
    user_info_div.appendChild(stats_div);

    //create elements inside user stats div
    const full_name = document.createElement("h4");
    stats_div.appendChild(full_name);
    full_name.innerHTML = first_name + last_name;

    const rating_div = document.createElement("div");
    rating_div.className = "rating";
    stats_div.appendChild(rating_div);
    rating_div.innerHTML = rating + " &#11088";

    //create review p
    const review_paragraph = document.createElement("p");
    review_div.appendChild(review_paragraph);
    review_paragraph.innerHTML = review;
}

//testing create review function
//document.addEventListener('click',createReview);