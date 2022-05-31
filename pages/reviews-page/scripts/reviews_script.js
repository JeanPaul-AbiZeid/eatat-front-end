//linking reviews data and creating pending reviews and confirmed reviews
axios({
    url: 'http://localhost/eatAt-backend/eatat-backend/reviews.php',
}).then(function(response){
    console.log(response.data); 
    //looping over the array to get review data
    for(let i=0; i<response.data.length; i++){
        let first_name = response.data[i]["first_name"];
        let last_name = response.data[i]["last_name"];
        let review = response.data[i]["review"];
        let rating = response.data[i]["ratings"];
        let resto_name = response.data[i]["name"];
        let is_pending = response.data[i]["is_pending"];
        //creating review card 
        createReview(is_pending,first_name,last_name,rating,review,resto_name);
    }
    
})

//function that creates a review card ,checks if its pending, and places it accordingly
function createReview(is_pending,first_name,last_name,rating,review,resto_name,image){  
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

    //create accept button if its a pending review card
    if (is_pending){
    const accept_btn = document.createElement("div");
    accept_btn.className = "yes";
    accept_btn.innerHTML = "&#9989";
    flex_div.appendChild(accept_btn);
    }

    //create reject button
    const reject_btn = document.createElement("div");
    reject_btn.className = "no";
    reject_btn.innerHTML = "&#10060";
    flex_div.appendChild(reject_btn);

}

//store all delete buttons
const all_delete_btns = document.querySelectorAll(".no");

//add event listeners and axios to every delete button
all_delete_btns.forEach(function(item){
  item.addEventListener('click',function(){
    console.log("worksss");
    item.parentElement.remove();

    //creating url with user id to send to restaurant php
    let url = "http://localhost/eatAt-backend/eatat-backend/delete-user.php";
    let user_id = item.classList[0];
    url += "?user_id=" + user_id;


    //linking delete button to delete-user api
    axios({
      url: url,
    }).then(function(response){
      //console.log(response.data); 
      alert("user deleted succesfully");
    }).catch(function (error){
      console.log(error);
    })
  })
})

//testing create review function
//document.addEventListener('click',createReview(1));