const rest_container = document.getElementById("generic");
const nav_home = document.getElementById("home");

//when user clicks the home in header
nav_home.addEventListener("click", function(){
    window.location.href = "./explore.html"
})

//when user clicks the restaurant card
rest_container.addEventListener("click",function(){
    window.location.href = "../restaurant-page/restaurant.html";
})

//creating restaurant card function
function createResto(name,loc,cost,category,image,description){
    console.log("worksss");
    //creating main div tag
    const card_div = document.createElement("div");
    document.body.appendChild(card_div);
    card_div.id = "roadster"; //TO be changed to name
    card_div.className = "rest-container";

    //creating resto image and its div
    const img_div = document.createElement("div");
    card_div.appendChild(img_div);

    const resto_img = document.createElement("img");
    img_div.appendChild(resto_img);
    resto_img.src = "./assets/rest-placeholder.png"; //TO BE CHAGED TO IMG FROM DATABASE

    //creating div for info
    const info_div = document.createElement("div");
    card_div.appendChild(info_div);
    info_div.className = "rest-info";

    //creating resto name h3
    const resto_name = document.createElement("h2");
    info_div.appendChild(resto_name);
    resto_name.innerText = "Roadster"; //TO be changed to name

    //creating div for location and loc icon
    const loc_div = document.createElement("div");
    info_div.appendChild(loc_div);

    const loc_icon = document.createElement("img");
    loc_icon.src = "./assets/icons8-location-24.png";
    loc_div.appendChild(loc_icon);

    const loc_name = document.createElement("h3");
    loc_div.appendChild(loc_name);
    loc_name.innerText = "beirut"; //to be changed to location

    //creating category h3
    const categ = document.createElement("h3");
    info_div.appendChild(categ);
    categ.innerText = "chinese"; //to be changed to category

    //creating avg price h3
    const avg_price = document.createElement("h3");
    info_div.appendChild(avg_price);
    avg_price.innerText = "50$"; //to be changed

    //creating rating div
    const rating_div = document.createElement("div");
    card_div.appendChild(rating_div);
    rating_div.className = "rating";

    const rating_h3 = document.createElement("h3");
    rating_div.appendChild(rating_h3);
    rating_h3.innerText = "3 &#11088"; //to be changed to rating??

    //creating description p
    const desc_p = document.createElement("p");
    card_div.appendChild(desc_p);
    desc_p.innerText = "ipsum lorem"; //to be changed to description

}

document.getElementById("test").addEventListener('click',createResto);



