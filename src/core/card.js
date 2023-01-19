import React from 'react'
import { useHistory } from 'react-router-dom'
import { addItemtoCartandsaveitTolocalStorage } from './helper/Cart_helper'
import ImageHelper from './helper/ImageHelper'


export default function Card({ product, addtocart = true, removefromcart = false, isCartimage = false, removeItemhandler }) {
    let location = useHistory()
    return (
        <div className="card text-white bg-dark border border-info text-center">
            <div className="card-header lead">{product.name}</div>
            <div className="card-body">
                <ImageHelper product={product} cartimage={isCartimage} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {product.description}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">{product.price} Rs</p>
                <div className="row">
                    <div className="col-12">
                        {addtocart && <button
                            onClick={() => {
                                addItemtoCartandsaveitTolocalStorage(product, () => {
                                    location.push('/Addtocard')
                                })
                            }}
                            className="btn btn-block btn-outline-success mt-2 mb-2"
                        >
                            Add to Cart
                        </button>}

                    </div>
                    <div className="col-12">
                        {removefromcart && <button
                            onClick={() => { removeItemhandler(product._id) }}
                            className="btn btn-block btn-outline-danger mt-2 mb-2"
                        >
                            Remove from cart
                        </button>}

                    </div>
                </div>
            </div>
        </div>
    )
}



