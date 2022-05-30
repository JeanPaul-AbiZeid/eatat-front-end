const nav_home = document.getElementById("home");

//
let url = "http://localhost:8080/eatAt-backend/eatat-backend/restaurant.php";
let resto_id = localStorage.getItem("clicked_resto_id");
url += "?id=" + resto_id;

axios({
    url: url,
}).then(function(response){
    console.log(response.data); 
    //looping over the array to get restaurant data
    let name = 
        createResto(name,location,avg_cost,category,description);
    
})


//when user clicks the home in header
nav_home.addEventListener("click", function(){
    window.location.href = "../../pages/explore-page/explore.html"
})

function fillPage(name,loc,cost,category,description,image)
{
    //add resto info
    const info_div = document.getElementById("info");
    info_div.children[0].innerHTML = name;
    info_div.children[1].innerHTML = loc;
    info_div.children[0].innerHTML = cost;

    //TODO add avg ratings andtotal ratings

    //add desciption
    document.getElementById("description").innerHTML = description;

}

