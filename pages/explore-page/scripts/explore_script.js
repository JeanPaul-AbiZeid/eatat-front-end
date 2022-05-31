//linking restaurants data and creating resto cards accordingly
axios({
    url: 'http://localhost/eatAt-backend/eatat-backend/explore.php',
}).then(function(response){
    console.log(response.data); 
    //looping over the array to get restaurant data
    for(let i=0; i<response.data.length; i++){
        let id = response.data[i]["id"];
        let name = response.data[i]["name"];
        let location = response.data[i]["name"];
        let avg_cost = response.data[i]["avg_cost"];
        let category = response.data[i]["category"];
        let description = response.data[i]["description"];
        createResto(id,name,location,avg_cost,category,description);

    }
    
    //when user clicks the restaurant card (declared inside the axios because it only worked here)
    const rest_container = document.querySelectorAll(".rest-container");

    rest_container.forEach(function(item){
        item.addEventListener("click",function(){
            //saved the clicked resto card id to local storage
            localStorage.setItem("clicked_resto_id", item.id);
            window.location.href = "../restaurant-page/restaurant.html";
        })
    })
})


const nav_home = document.getElementById("home");

//when user clicks the home in header
nav_home.addEventListener("click", function(){
    window.location.href = "./explore.html";
})


//creating restaurant card function
function createResto(id,name,loc,cost,category,description,image){
    //creating main div tag and inserting it before footer
    const card_div = document.createElement("div");
    document.body.insertBefore(card_div, document.getElementById("footer"));
    card_div.id = id; //each card has its database id as html id
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

    //creating resto name h2
    const resto_name = document.createElement("h2");
    info_div.appendChild(resto_name);
    resto_name.innerText = name;

    //creating div for location and loc icon
    const loc_div = document.createElement("div");
    info_div.appendChild(loc_div);

    const loc_icon = document.createElement("img");
    loc_icon.src = "./assets/icons8-location-24.png";
    loc_div.appendChild(loc_icon);

    const loc_name = document.createElement("h3");
    loc_div.appendChild(loc_name);
    loc_name.innerText = loc; //to be changed to location

    //creating category h3
    const categ = document.createElement("h3");
    info_div.appendChild(categ);
    categ.innerText = category; 

    //creating avg price h3
    const avg_price = document.createElement("h3");
    info_div.appendChild(avg_price);
    avg_price.innerText = cost; 

    //creating rating div
    const rating_div = document.createElement("div");
    card_div.appendChild(rating_div);
    rating_div.className = "rating";

    const rating_h3 = document.createElement("h3");
    rating_div.appendChild(rating_h3);
    rating_h3.innerHTML = "3 &#11088"; //to be changed to rating??

    //creating description p
    const desc_p = document.createElement("p");
    card_div.appendChild(desc_p);
    desc_p.innerText = description; 

}

document.getElementById("test").addEventListener('click',createResto);


