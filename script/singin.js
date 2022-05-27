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
        }
    }
    else displayError = true;

    if (displayError) {
        errorLabel.innerText = "Wrong Email or Password!";
    }
}

function validateEmail(email) {
    let atIndex = [];

    for (let i = 0; i < email.length; i++) {
        if (email[i] == "@") atIndex.push(i);
    }
    if (atIndex.length != 1) return false; // cant have more than one @
    if (atIndex[0] == 0) return false; // cant have @ at the start of the email

    if (email[0] == ".") return false; // email cant start with a dot "."


    let splittedEmail = email.split("@");
    if (splittedEmail[splittedEmail.length - 1][0] == ".") return false; // domain cant start with a dot "."

    let doubleQuoted = false;
    if (splittedEmail[0][0] == "\"" && splittedEmail[0][splittedEmail[0].length - 1] == "\"") doubleQuoted = true;

    for (let i = 0; i < splittedEmail[splittedEmail.length - 1].length - 1; i++) { // cant have two dots ".." one after the other 
        if (splittedEmail[splittedEmail.length - 1][i] == "." && splittedEmail[splittedEmail.length - 1][i + 1] == ".") return false;
    }

    for (let i = 0; i < splittedEmail[0].length - 1; i++) { // cant have two dots ".." one after the other 
        if ((splittedEmail[0][i] == "." && splittedEmail[0][i + 1] == ".") && !doubleQuoted) return false;
    }

    let testCh;
    for (let i = 0; i < splittedEmail[0].length; i++) {
        testCh = splittedEmail[0][i];
        if ((testCh == "\"" ||
            testCh == "," ||
            testCh == ":" ||
            testCh == "(" ||
            testCh == ")" ||
            testCh == ";" ||
            testCh == "<" ||
            testCh == ">" ||
            testCh == "[" ||
            testCh == "]" ||
            testCh == " " ||
            testCh == "\\") && !doubleQuoted) return false;
    }
    if (splittedEmail[0].length > 64) return false;

    // cant have "_" in the domain
    for (let i = 0; i < splittedEmail[0].length; i++) {
        testCh = splittedEmail[splittedEmail.length - 1][i];
        if (testCh == "_") return false;
    }

    return true;
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