import React, { useState } from "react";
import Sizebutton from "./Sizebutton";
import Addtocart from "../core/Addtocart";
import StripePayment from "../payment/StripePayment";
import NormalAlert from "../core/helper/NormalAlert";
import { cloneDeep, cloneDeepWith } from "lodash";
import styles from "../css/productInfo.module.css";
import api from "../backend/Api";
export default function ProductDetail({ productinfo }) {
  const [sizevalue, setsizevalue] = useState("");
  const [showalert, setshowalert] = useState(false);
  //eslint
  const [isClicked, setisClicked] = useState(false);
  //eslint

  let alertuser;
  if (!sizevalue.length && showalert) {
    alertuser = true;
  } else {
    alertuser = false;
  }
  // console.log(productinfo);
  function addsize(productobj) {
    let obj = cloneDeep(productobj);
    obj.size = sizevalue;
    obj.count = 1;
    return obj;
  }
  
  // ${api}/product/photo/${productinfo._id}
  const imageurl = productinfo._id
    ? `https://eelicate.sirv.com/Images/product${productinfo._id}.webp?format=webp`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className={`container-fluid row ${styles.productdivcontainer}`}>
      <div
        className={`col-md-8 ${styles.imagewrapper} border border-secondary-subtle py-3`}
      >
        <img
          data-src={imageurl}
          className={`Sirv ${styles.productimage} productdetail-img`}
          alt="productimage"
        />
      </div>
      <div className="col-md-4 p-3 align-self-start border-top border-secondary-subtle">
        <div className="d-flex flex-column text-left justify-content-between border-bottom border-light">
          <h3>{productinfo?.name}</h3>
          <p className="text-secondary small-text">
            {productinfo?.description}
          </p>
        </div>
        <div className="border-bottom border-light my-2">
          <h4 className="display-2">₹ {productinfo?.price} </h4>
          <h6 className="text-secondary">
            Only {productinfo?.Availabelstock} left!
          </h6>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="my-2 border-light d-flex flex-column gap-2 justify-content-between "
          >
            <div className="d-flex flex-row gap-3 align-items-center my-1">
              {productinfo?.size?.map((sizeitem) => {
                return (
                  <Sizebutton
                    onClickHandler={setsizevalue}
                    key={sizeitem._id}
                    size={sizeitem.name}
                    value={sizeitem.name}
                    setisClicked={setisClicked}
                  />
                );
              })}
            </div>

            {alertuser && <NormalAlert msg="please select size"></NormalAlert>}
            <div className={`${styles.btncontainer}`}>
              <Addtocart
                alertuser={setshowalert}
                product={cloneDeepWith(productinfo, addsize)}
                size={sizevalue}
                addtocart={true}
              ></Addtocart>

              <StripePayment
                alertuser={setshowalert}
                products={[productinfo].map(() =>
                  cloneDeepWith(productinfo, addsize)
                )}
                size={sizevalue}
              >
                BUY NOW
              </StripePayment>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
