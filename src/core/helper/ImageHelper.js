import React from "react";
import api from "../../backend/Api";

function ImageHelper({
  product,
  style,
  className,
  parentclassname = `rounded border p-1 my-1 d-flex justify-content-center align-items-center`,
  parentstyle = { boxShadow: "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px" },
}) {
  const imageurl = product
    ? `${api}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className={parentclassname} style={parentstyle}>
      <img
        src={imageurl}
        alt={product.name}
        style={style}
        className={`rounded ${className && className}`}
      />
    </div>
  );
}

export default ImageHelper;
