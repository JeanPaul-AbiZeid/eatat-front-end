//linking reviews data and creating pending reviews and confirmed reviews
axios({
    url: 'http://localhost:8080/eatAt-backend/eatat-backend/reviews.php',
}).then(function(response){
    console.log(response.data); 
    //looping over the array to get restaurant data
    for(let i=0; i<response.data.length; i++){
        let first_name = response.data[i]["first_name"];
        let last_name = response.data[i]["last_name"];
        let review = response.data[i]["review"];
        let rating = response.data[i]["ratings"];
        let resto_name = response.data[i]["name"];
        let is_pending = response.data[i]["is_pending"];
        createReview(is_pending,first_name,last_name,rating,review,resto_name);


    }
    
  /*   //when user clicks the restaurant card (declared inside the axios because it only worked here)
    const rest_container = document.querySelectorAll(".rest-container");

    rest_container.forEach(function(item){
        //console.log("working");
        item.addEventListener("click",function(){
            //saved the clicked resto card id to local storage
            localStorage.setItem("clicked_resto_id", item.id);
            window.location.href = "../restaurant-page/restaurant.html";
        })
    }) */
})

function createReview(is_pending,first_name,last_name,rating,review,resto_name,image){  
    console.log("workingggg");
   
    //check if review is pending to decide where to create review card
    if(is_pending){
        var pending_or_confirmed = document.getElementById("pending-section");
    }else{
        var pending_or_confirmed = document.getElementById("confirmed-section");
    }
    
    //create review div holding the header of resto
    const big_review_card = document.createElement("div")
    big_review_card.className = "review-card";
    pending_or_confirmed.appendChild(big_review_card);

    //create header of resto name
    const resto_name_header = document.createElement("h3");
    resto_name_header.className = "rest-name";
    resto_name_header.innerHTML = resto_name;
    big_review_card.appendChild(resto_name_header)

    //create flex div for review card, and append to resto card
    const flex_div = document.createElement("div");
    flex_div.className = "confirm";
    big_review_card.appendChild(flex_div);
    
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
    full_name.innerHTML = first_name + " " + last_name;

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
//document.addEventListener('click',createReview(1));