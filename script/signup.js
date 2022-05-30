function validateSignUp() {
  var userName = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("passwordConfirm").value;
  var mail = document.getElementById("email").value;
  let errorMsg = document.getElementById("Error");

  let userNameValid = userName != null && userName != "" && userName.length > 2;
  let mailValid = mail != null && mail != "" && validateEmail(mail);
  let passwordValid = password != null && confirmPassword != null && validatePassword(password, confirmPassword);

  if (userNameValid && mailValid && passwordValid) {
    errorMsg.textContent = "";
    const user = {
      UserName: userName,
      Password: password,
      Email: mail,
    };
    addToLocalStorage(user);
    window.location.href = "/pages/signin.html";
  }
  else {
    errorMsg.textContent = "you have invalid fields!"
  }
}

function addToLocalStorage(user) {
  const userNameEl = document.getElementById("username").value;
  const passwordEl = document.getElementById("password").value;
  const emailEl = document.getElementById("email").value;
  let usersList = [];

  if (localStorage.getItem("registeredUsers"))
    usersList = JSON.parse(localStorage.getItem("registeredUsers"));
  usersList.push(user);
  localStorage.setItem("registeredUsers", JSON.stringify(usersList));
}

function validateEmail(email) {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

function validatePassword(password, confirm) {
  let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (password.length < 6 && !password.match(passw) && passw != confirm) {
    return false;
  }
  return true;
}