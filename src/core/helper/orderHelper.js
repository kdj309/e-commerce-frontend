import api from "../../backend/Api";
export async function createOrder(userid, token, orderData) {
  let response = await api(`/order/create/${userid}`, {
    method: "POST",
    data: { order: orderData },
  });
  return response.data;
}
export async function getPaymentInfo(userid, token, paymentId) {
  let response = await api(`${api}/${userid}/paymentinfo/${paymentId}`, {
    method: "GET",
  });
  return response.data;
}
