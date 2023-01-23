import React, { useState, useEffect } from 'react'
import { getAllproducts } from '../admin/helper/adminapicall';
import Base from './Base'
import Card from './card';
export default function Home() {
  const [products, setproducts] = useState([])
  function preload() {
    getAllproducts().then((data) => {
      if (data.errors || data.errormsg) {
        console.log(data.errormsg);
      } else {
        setproducts(data)
      }
    })
  }
  useEffect(() => {

    preload()

  }, [])

  document.body.style = 'background: #343a40;';
  return (
    <Base title="Welcome to coders t-shirt adda" description='All of our t-shirts dedicated to amazing coders'>
      <div className="container d-flex justify-content-evenly flex-wrap align-items-center p-2 gap-2">
        {
          products?.map((product) => {
            return <Card key={product._id} product={product} />
          })
        }
      </div>
    </Base>
  )
}
