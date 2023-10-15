import api from "../../backend/Api";
export async function getAllSizeOfProduct(userid, token, orderData) {
  let response = await api(`/order/create/${userid}`, {
    method: "POST",
    data: { order: orderData },
  });
  return response.data;
}
export async function getUser(userid, token) {
  let response = await api(`/user/${userid}`, {
    method: "GET",
  });
  return response.data;
}

export async function updateUser(userid, token, updatedUser) {
  let response = await api(`/user/${userid}`, {
    method: "PUT",
    data:updatedUser,
  });
  return response.data;
}

export async function deleteOrderItem(userid, token, uid) {
  let response = await api(`/user/updatepurchaselist/${userid}`, {
    method: "PUT",
    data:{ uid: uid },
  });
  return response.data;
}
