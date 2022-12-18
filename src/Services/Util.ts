// https://www.w3schools.com/js/js_cookies.asp
export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//https://www.tutorialspoint.com/How-can-I-delete-all-cookies-with-JavaScript
export function removeCookies() {
  var res = document.cookie;
  var multiple = res.split(";");
  for (var i = 0; i < multiple.length; i++) {
    var key = multiple[i].split("=");
    document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC; path = /; domain = fresh-market-project.com";
  }
}