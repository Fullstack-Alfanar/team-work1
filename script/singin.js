document.getElementById("signInBtn").addEventListener("click", signIn);

function signIn() {
    let emailIn = document.getElementById("emailInput");
    let passwordIn = document.getElementById("passwordInput");
    let errorLabel = document.getElementById("errorMessage");

    let displayError = false;
    let emailValid = false;
    let passwordValid = passwordIn.value != null && passwordIn.value != "" ? true : false;

    if (emailIn.value != null && emailIn.value != "")
        emailValid = validateEmail(emailIn.value);

    if (emailValid && passwordValid) {
        errorLabel.innerText = "";
        let user = {
            Email: emailIn.value,
            Password: passwordIn.value
        }

        if (checkIfUserIsRegistered(user)) {
            saveToCookies(user);
            window.location.replace("/pages/dashboard.html");
        } else displayError = true;
    }
    else displayError = true;

    if (displayError) {
        errorLabel.innerText = "Wrong Email or Password!";
    }
}

function validateEmail(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

function checkIfUserIsRegistered(user) {
    if (localStorage.getItem("registeredUsers")) {
        let usersList = JSON.parse(localStorage.getItem("registeredUsers"));
        for (const obj of usersList) {
            if (obj.Email == user.Email && obj.Password == user.Password) return true;
        }
    }
    return false;
}

function saveToCookies(user) {
    let xHours = 2; // how many hours the user stays signed in
    const d = new Date();
    d.setTime(d.getTime() + (xHours * 60 * 60 * 1000));
    let expires = d.toUTCString();
    document.cookie = `signedInUser=${user.Email};expires=${expires};path=/`;
}
