import api from "../../backend/Api";
//signup method
export async function signup(user) {
  let response = await fetch(`${api}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });
  let data = await response.json();
  return data;
}
//sign in
export async function signin(user) {
  let response = await fetch(`${api}/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });
  let data = await response.json();
  return data;
}
//middleware to save token in user browser
export function authenticate(data, next) {
  //this will check weather page is active
  if (typeof window != undefined) {
    //console.log(document.cookie);
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "signinuser",
      JSON.stringify({
        email: data.Email,
        id: data.id,
        firstname: data.fname,
        lastname: data.lname,
        role: data.role,
        authtoken: data.token,
      })
    );
    next();
  }
}
//signout
export async function Signout(next) {
  if (typeof window != undefined) {
    localStorage.removeItem("token");
    localStorage.removeItem("signinuser");
    next();
    let response = await fetch(`${api}/signout`);
    let data = await response.json();
    console.log(data);
  }
}
//isSign
export function isSignin() {
  if (localStorage.getItem("signinuser") !== null) {
    return JSON.parse(localStorage.getItem("signinuser"));
  } else {
    return false;
  }
}
