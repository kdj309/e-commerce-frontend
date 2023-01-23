import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import PaymentUIForB from '../payment/paymentUIForB'
import Base from './Base'
import Card from './card'
import { emptyCart, removeItemfromCart } from './helper/Cart_helper'
import StripePayment from '../payment/StripePayment'


export default function Cart() {
    let location = useHistory()

    const [products, setproducts] = useState([])
    const productsfromlocalstorage = useMemo(
        () => {
            if (localStorage.getItem('cart') != null) {
                return JSON.parse(localStorage.getItem('cart'))
            } else {
                return []
            }
        },
        [],
    )
    useEffect(() => {
        setproducts(productsfromlocalstorage)
    }, [productsfromlocalstorage])
    function removeProductfromCart(productid) {
        setproducts(removeItemfromCart(productid))
    }
    function isCartEmpty() {
        setproducts(emptyCart())
    }
    return (
        <Base title="Welcome to your cart" description='All of our t-shirts dedicated to amazing coders'>
            <div className=" container row text-center">
                <div className="col-md-6 d-flex justify-content-evenly flex-wrap align-items-center p-2 gap-2 flex-column">
                    {
                        products?.length == 0 ? <h3 className='text-white'>You are really gone miss some cool t-shirts in your wardrobe <span className='badge bg-success mr-2'>buy some t-shirt man 😎!</span></h3> : (
                            products?.map((product) => {
                                return <Card showcount={true} count={product.count} removeItemhandler={removeProductfromCart} isCartimage={true} key={product._id} product={product} addtocart={false} removefromcart={true} />
                            })
                        )
                    }
                </div>
                <div className="col-md-6">
                    {/* <PaymentUIForB products={products} reload={isCartEmpty} /> */}
                    {products.length > 0 && <StripePayment products={products} reload={isCartEmpty} />}
                </div>
            </div>
        </Base>
    )
}
