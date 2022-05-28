/* //axios
let data = new FormData();
let id = 0;
data.append('user_id', id);
axios({
    method: 'post',
    url: 'http://localhost/project/get_restos.php',
    data: data,
    })
.then(function (response) {
    console.log(response);
    })
 */
var show = document.getElementById("toggle");
show.addEventListener("click", reveal);
function reveal() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("sign-up");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

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

