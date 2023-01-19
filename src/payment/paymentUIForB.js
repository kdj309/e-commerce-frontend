import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isSignin } from '../auth/helper'
import { loadproductstocart } from '../core/helper/Cart_helper'
import { createOrder } from '../core/helper/orderHelper'
import { getmetoken, processPayment } from './paymentB'
import DropIn from "braintree-web-drop-in-react";
export default function PaymentUIForB({ products, reload }) {

    const { id, authtoken } = isSignin()
    const [info, setinfo] = useState({
        loading: false,
        success: false,
        errormsg: "",
        clientToken: null,
        instance: {}
    })
    const getToken = (userid, token) => {
        getmetoken(userid, token).then((response) => {
            console.log("response: ", response);
            if (response.error) {
                setinfo({
                    ...info,
                    errormsg: response.error
                })
            } else {
                setinfo({
                    clientToken: response.clientToken,
                    success: true
                })
            }
        })
    }
    useEffect(() => {
        totalAmount()
    }, [products])
    useEffect(() => {
        getToken(id, authtoken)
    }, [])
    const onPurchase = () => {
        setinfo({ ...info, loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: totalAmount()
            };
            processPayment(id, authtoken, paymentData)
                .then(response => {

                    setinfo({ ...info, success: response.success, loading: false });
                    console.log("PAYMENT SUCCESS");
                    const orderInfo = {
                        'products': products,
                        transactionId: response.transaction.id,
                        amount: response.transaction.amount,
                        'user': id
                    }
                    createOrder(id, authtoken, orderInfo)
                    reload()
                    //TODO: empty the cart
                    //TODO: force reload
                })
                .catch(error => {

                    setinfo({ loading: false, success: false });
                    console.log("PAYMENT FAILED");
                });
        });
    }
    const totalAmount = () => {
        return products.reduce((total, product) => {
            return total + product.price
        }, 0)
    }
    return (
        <>
            <h2>Total amount {totalAmount()} rs</h2>
            {info.clientToken != null && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={(instance) => (info.instance = instance)}
                    />
                    <button className='btn btn-lg btn-success' onClick={onPurchase}>Buy</button>
                </div>
            ) : (
                <h3>Please login or add something to cart</h3>

            )}
        </>

    )
}
