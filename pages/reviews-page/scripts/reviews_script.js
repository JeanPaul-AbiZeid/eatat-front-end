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
        createReview(first_name,last_name,review,rating,resto_name);


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