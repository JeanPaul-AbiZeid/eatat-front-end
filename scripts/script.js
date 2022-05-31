const sign_up_btn = document.getElementById("sign-up-button");
const log_in_btn = document.getElementById("login");

//function when clicking sign up button 
let signUpSubmit= (e) =>{
  e.preventDefault();
  let data = new FormData();

  data.append('first-name', document.getElementById("first-name").value);
  data.append('last-name', document.getElementById("last-name").value);
  data.append('email', document.getElementById("email").value);
  data.append('password', document.getElementById("password").value);

  //linking with sign up api
  axios({
    method: 'post',
    url: 'http://localhost/eatAt-backend/eatat-backend/sign-up.php',
    data: data,
  })
  .then(function (response) {
    //check if the email exists
    if(response.data["success"]){
      window.location.href = "./pages/explore-page/explore.html";
      localStorage.setItem("id", response.data["id"]);
      //id = response.data["id"];
    }else{
      alert(response.data["response"]); //email already exists
    }
  })
  .catch(function (error){
    console.log(error);
  })
}


//function for log in button on click
let logIn = (e)=>{
  e.preventDefault();
  let data = new FormData();

  data.append('email', document.getElementById("email").value);
  data.append('password', document.getElementById("password").value);

  //linking with login api
  axios({
    method: 'post',
    url: 'http://localhost/eatAt-backend/eatat-backend/login.php',
    data: data,
  })
  .then(function (response) {
    //check if log in was succesfull
    if(response.data["success"]){
      //saving logged in user id in local storage
      localStorage.setItem("id", response.data["user_id"]);
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

//Event listeners for signup and login
sign_up_btn.addEventListener('click',signUpSubmit);
log_in_btn.addEventListener('click', logIn);

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("sign-up");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

//checkbox for showing password
var show = document.getElementById("toggle");

//function that shows password with checkbox
show.addEventListener("click", reveal);
function reveal() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

// When the user clicks the button, open the modal 
btn.addEventListener("click", function(){
    modal.style.display = "block";})

// When the user clicks on <span> (x), close the modal
span[0].addEventListener("click", function(){
    modal.style.display = "none";})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

