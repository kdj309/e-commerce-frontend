import api from "../../backend/Api";
export async function getAllSizeOfProduct(userid, token, orderData) {
  let response = await fetch(`${api}/order/create/${userid}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order: orderData }),
  });
  let data = await response.json();
  return data;
}
export async function getUser(userid, token) {
  let response = await fetch(`${api}/user/${userid}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await response.json();
  return data;
}

export async function updateUser(userid, token, updatedUser) {
  let response = await fetch(`${api}/user/${userid}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  let data = await response.json();
  return data;
}

export async function deleteOrderItem(userid, token, uid) {
  let response = await fetch(`${api}/user/updatepurchaselist/${userid}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: uid }),
  });
  let data = await response.json();
  return data;
}
