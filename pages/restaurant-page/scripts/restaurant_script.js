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
})


//linking add review php when user submits a review
let addReview = (e)=>{
    e.preventDefault();
    let data = new FormData();
  
    data.append('', document.getElementById("email").value);
    data.append('password', document.getElementById("password").value);
  
    //linking with login api
    axios({
      method: 'post',
      url: 'http://localhost:8080/eatAt-backend/eatat-backend/login.php',
      data: data,
    })
    .then(function (response) {
      //check if log in was succesfull
      if(response.data["success"]){
        //saving logged in user id in local storage
        localStorage.setItem("id", response.data["user_id"]);
        //
        if(response.data["type"]=== 1){
          window.location.href = "./pages/explore-page/explore.html";
        }else{
          window.location.href = "./pages/admin-page/admin.html";
        }
  
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



