import api from "../backend/Api";

export async function getmetoken(userid, token) {
    let response = await api(`/payment/getToken/${userid}`, {
        method: 'GET',
    })
    return response.data
}
//!
export async function processPayment(userid, token, paymentInfo) {
    let response = await api(`/payment/paymentprocess/Braintree/${userid}`, {
        method: 'POST',
        data:paymentInfo
    })
    return response.data
}