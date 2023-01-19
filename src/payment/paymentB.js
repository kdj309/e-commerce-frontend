import api from "../backend/Api";

export async function getmetoken(userid, token) {
    let response = await fetch(`${api}/payment/getToken/${userid}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    let data = await response.json()
    return data
}
//!
export async function processPayment(userid, token, paymentInfo) {
    let response = await fetch(`${api}/payment/paymentprocess/Braintree/${userid}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    })
    let data = await response.json()
    return data
}