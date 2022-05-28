function validateSignUp() {
  var userName = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var mail = document.getElementById("email").value;
  let emailcharts = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (
    userName == null ||
    userName == "" ||
    userName.length <= 2 ||
    userName.length >= 9
  ) {
    alert("There's Filed Missing");
    document.getElementById("username").style.borderColor = "red";
  } else if (mail.match(emailcharts)) {
    return true;
  } else {
    alert("You Have entered an invalid email address!");
    return false;
  }
  if (password.match(passw) && password.length < 6) {
    return true;
  } else {
    return false;
  }
  addToLocalStorage();
}
function addToLocalStorage() {
  const userNameEl = document.getElementById("username").value;
  const passwordEl = document.getElementById("password").value;
  const emailEl = document.getElementById("email").value;

  const obj = {
    username: userNameEl,
    password: passwordEl,
    email: emailEl,
  };
  arr.push(obj);
  localStorage.setItem("List", JSON.stringify(arr));
}
