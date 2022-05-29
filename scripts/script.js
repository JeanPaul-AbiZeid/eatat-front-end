sign_up_btn = document.getElementById("sign-up-button");

//submit button functionality
let signUpSubmit= (e) =>{
  e.preventDefault();
  let data = new FormData();

  data.append('first-name', document.getElementById("first-name").value);
  data.append('last-name', document.getElementById("last-name").value);
  data.append('email', document.getElementById("email").value);
  data.append('pass', document.getElementById("pass").value);
  axios({
    method: 'post',
    url: 'http://localhost:8080/eatAt-backend/eatat-backend/sign-up.php',
    data: data,
  })
  .then(function (response) {
    console.log(response);

  }).catch(function (error){
    console.log(error);
  })

}

sign_up_btn.addEventListener('click',signUpSubmit);



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
  var x = document.getElementById("myInput");
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

