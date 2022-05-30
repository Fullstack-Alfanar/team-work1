function CheckValidEmail(email) {
    var email = document.getElementById("email");
    var txt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!txt.test(email.value)) {
        alert("This is an inValid email !");
        return false;

    }
    else {
        alert(" Please check your email to update Your Password");
        return true;


    }

}  