import api from "../../backend/Api";
export async function createOrder(userid, token, orderData) {
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
export async function getPaymentInfo(userid, token, paymentId) {
  let response = await fetch(`${api}/${userid}/paymentinfo/${paymentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await response.json();
  return data;
}
