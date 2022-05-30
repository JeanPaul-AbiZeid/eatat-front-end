const nav_home = document.getElementById("home");

//sending resto id to php with url
let url = "http://localhost:8080/eatAt-backend/eatat-backend/restaurant.php";
let resto_id = localStorage.getItem("clicked_resto_id");
url += "?id=" + resto_id;

//linking resto page to api
axios({
    url: url,
}).then(function(response){
    result = response.data;
    console.log(response.data); 
    //use resto data to fill up page
    let name = result.name;
    let location = result.location;
    let avg_cost = result.avg_cost;
    let category = result.category;
    let description = result.description;
    fillPage(name,location,avg_cost,category,description); 
}).catch(function (error){
    console.log(error);
  })


//linking add review php when user submits a review
let addReview = (e)=>{
    e.preventDefault();
    let data = new FormData();
  
    data.append('user_id', localStorage.getItem("id"));
    data.append('restaurant_id', localStorage.getItem("clicked_resto_id"));
    data.append('review', document.getElementById("review"));

    //linking with add-review api
    axios({
      method: 'post',
      url: 'http://localhost:8080/eatAt-backend/eatat-backend/login.php',
      data: data,
    })
    .then(function (response) {
      //check if log in was succesfull
      if(response.data["success"]){
        
  
      }else{
        alert(response.data["response"]); //incorrect email and/or password
      }
    })
    .catch(function (error){
      console.log(error);
    })
  }


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
    console.log(rating_radio);
    for(let i =0; i<rating_radio.length; i++){
        if(rating_radio[i].checked){
            return rating_radio[i].value;
        }
    }
}

document.addEventListener("click",function(){
    var x = checkedRating();
    console.log(x);
})


