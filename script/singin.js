document.getElementById("signInBtn").addEventListener("click", signIn);

function signIn() {
    let emailIn = document.getElementById("emailInput");
    let passwordIn = document.getElementById("emailInput");

    let emailValid;
    let passwordValid = passwordIn.value != null && passwordIn.value != "" ? true : false;

    if (emailIn.value != null && emailIn.value != "")
        emailValid = validateEmail(emailIn.value);

    if (emailValid && passwordValid) {
        // todo: valid email and password check for sign in
        // todo: check if values are in local storage
        // todo: if the value is in local storage add to cookies for one week
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