const nav_home = document.getElementById("home");
const rest_container = document.getElementById("rest-container");
const logout_btn = document.getElementById("logout");

//when user clicks the home in header
nav_home.addEventListener("click", function(){
    window.location.href = "../../pages/explore-page/explore.html"
})

//when user clicks the restaurant card
rest_container.addEventListener("click",function(){
    window.location.href = "../restaurant-page/restaurant.html";
})

//when user clicks on logout
logout_btn.addEventListener('click',function(){
    window.location.href = "../../index.html";
})

//creating url with user id to send to user-info api
id = localStorage.getItem("id");
var api_profile = 'http://localhost:8080/eatAt-backend/eatat-backend/user-info.php'
var url_id = api_profile + '?id=' + id;

//linking user data and creating user profile accordingly
axios({
    url: url_id,
}).then(function(response){
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

var api_review = 'http://localhost:8080/eatAt-backend/eatat-backend/get-recent-review.php'
var url_recent_id = api_review + '?id=' + id;

axios({
    url: url_recent_id,
}).then(function(response){
    //Getting last two reviews
    let last = (response.data.length - 1);
    let review = response.data[last]["review"];
    let ratings = response.data[last]["ratings"];
    let name = response.data[last]["name"];
    createRecent(review, ratings, name);

    let before_last = (response.data.length - 2);
    let review_2 = response.data[before_last]["review"];
    let ratings_2 = response.data[before_last]["ratings"];
    let name_2 = response.data[before_last]["name"];
    createRecent(review_2, ratings_2, name_2);
})

function createRecent(review, ratings, name){
    //main container
    const recent_review_container = document.getElementsByClassName("recent-reviews");

    //recent reviews
    const review_div = document.createElement("div");
    const div_class = review_div.classList;
    div_class.add("review");
    div_class.add("blue-border");
    recent_review_container[0].appendChild(review_div);

    //div inside review_div
    const rating = document.createElement("div");
    rating.className = "name-rating";
    review_div.appendChild(rating);

    //h3 inside rating
    const rest_name = document.createElement("h3");
    rest_name.className = "lobster";
    rest_name.innerHTML = name;
    rating.appendChild(rest_name);

    //div inside rating after h3
    const rate_number = document.createElement("div");
    rate_number.className = "rating";
    rating.appendChild(rate_number);

    //h3 inside rate_number div
    const rate_value = document.createElement("h3");
    rate_value.innerHTML = ratings + "&#11088";
    rate_number.appendChild(rate_value)

    //child of review_div
    const description = document.createElement("p");
    description.id = "Description";
    description.innerHTML = review;
    review_div.appendChild(description);
}

var api_favorites = 'http://localhost:8080/eatAt-backend/eatat-backend/get-favorites.php'
var url_fav_id = api_favorites + '?user_id=' + id;

axios({
    url: url_fav_id,
}).then(function(response){
    console.log(response.data)
    // //looping over the array to get user data
    for(let i = 0; i < response.data.length; i++){
        let id = response.data[i]["id"];
        let name = response.data[i]["name"];
        let location = response.data[i]["location"];
        let avg_cost = response.data[i]["avg_cost"];
        let category = response.data[i]["category"];
        let image = response.data[i]["image"];
        let descript = response.data[i]["description"];
        createFavorite(id, name, location, avg_cost, category, image, descript);

        //when user clicks one of the favorite restaurant cards   (declared inside the axios because it only worked here)
        const rest_container = document.querySelectorAll(".rest-container");

        rest_container.forEach(function(item){
            item.addEventListener("click",function(){
                //saved the clicked resto card id to local storage
                localStorage.setItem("clicked_resto_id", item.id);
                window.location.href = "../restaurant-page/restaurant.html";
        })
    })
}})


function createFavorite(id, name, location, avg_cost, category, image, descript) {
    const favorite_container_parent = document.getElementsByClassName("fav-restaurant");
    
    //child of favorite_container_parent
    const main_div = document.createElement("div");
    main_div.id = id;
    const main_class = main_div.classList;
    main_class.add("rest-container");
    main_class.add("blue-border");
    favorite_container_parent[0].appendChild(main_div);

    //children of main div
    const image_div = document.createElement("div");
    main_div.appendChild(image_div);

    const resto_pic = document.createElement("img")
    resto_pic.src = "./assets/rest-placeholder.png";
    image_div.appendChild(resto_pic);

    //child of main div
    const rest_info = document.createElement("div");
    rest_info.className = "rest-info";
    main_div.appendChild(rest_info);

    //restaurant name
    const rest_name = document.createElement("h2");
    rest_name.innerHTML = name;
    rest_info.appendChild(rest_name);

    //location
    const rest_location = document.createElement("h3");
    rest_location.innerHTML = "&#128205" + location;
    rest_info.appendChild(rest_location);

    // category
    const rest_category = document.createElement("h3");
    rest_category.innerHTML = category;
    rest_info.appendChild(rest_category)

    // average cost
    const rest_avg_price = document.createElement("h3");
    rest_avg_price.innerHTML = avg_cost;
    rest_info.appendChild(rest_avg_price);
    
    //descripton
    const desc = document.createElement("p")
    desc.innerHTML = descript;
    main_div.appendChild(desc);
}