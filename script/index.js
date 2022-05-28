function getCookies() {
  let cookie = document.cookie;
  let user = "";
  if (cookie.includes("signedInUser")) {
    let splitCookie = cookie.split(";");
    for (let i = 0; i < splitCookie.length; i++) {
      if (splitCookie[i].includes("signedInUser")) {
        user = splitCookie[i].split("=")[1];
      }
    }
  }
  return user;
}

function checkUser() {
  $(document).onload(() => {
    let user = getCookies("signedInUser");
    if (user != "") {
      window.location.replace("/pages/dashborad.html");
    } else {
      window.location.replace("/pages/signin.html");
    }
  });
}
checkUser();
