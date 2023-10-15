import api from "../../backend/Api";
//signup method
export async function signup(user) {
  let response = await api(`/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    data: user,
  });
  return response.data;
}
//sign in
export async function signin(user) {
  let response = await api(`/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    data: user,
  });
  return response.data;
}
//middleware to save token in user browser
export function authenticate(data, next) {
  //this will check whether page is active
  if (typeof window != undefined) {
    //console.log(document.cookie);
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshtoken", data.refreshToken);
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
    localStorage.removeItem("refreshtoken")
    next();
    let response = await api(`/signout`);
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
